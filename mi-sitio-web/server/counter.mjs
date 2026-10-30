// Servicio opcional, Node 20+. Un proceso y un volumen persistente.
// Cuenta sesiones registradas; NO mide personas únicas ni bloquea todos los bots.
import http from 'node:http';
import { readFile, writeFile, rename, mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

export async function createCounter({file, origins}) {
  let state={total:0,sessions:{}};
  try { state=JSON.parse(await readFile(file,'utf8')); }
  catch(error){ if(error.code!=='ENOENT')throw error; }
  if(!Number.isSafeInteger(state.total)||state.total<0||!state.sessions||typeof state.sessions!=='object')throw new Error('Archivo de contador inválido');
  await mkdir(dirname(file),{recursive:true});
  let queue=Promise.resolve();
  const register=id=>{
    const task=queue.then(async()=>{
      const now=Date.now();
      if(state.sessions[id]?.expires>now)return state.sessions[id].number;
      if(state.total===Number.MAX_SAFE_INTEGER)throw new Error('Límite del contador');
      const sessions=Object.fromEntries(Object.entries(state.sessions).filter(([,value])=>value.expires>now));
      // Evita crecimiento sin límite: no renueva sesiones antiguas ni registra datos de identidad.
      if(Object.keys(sessions).length>=100000)throw new Error('Capacidad de sesiones alcanzada');
      const next={total:state.total+1,sessions:{...sessions,[id]:{number:state.total+1,expires:now+86400000}}};
      await writeFile(`${file}.tmp`,JSON.stringify(next));
      await rename(`${file}.tmp`,file);
      state=next;
      return state.total;
    });
    queue=task.catch(()=>{});
    return task;
  };
  return http.createServer(async(req,res)=>{
    const origin=req.headers.origin;
    const headers={'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store','Vary':'Origin'};
    function send(code,value){res.writeHead(code,headers);res.end(JSON.stringify(value));}
    if(!origin||!origins.includes(origin)){send(403,{error:'Origen no permitido'});return;}
    headers['Access-Control-Allow-Origin']=origin;
    headers['Access-Control-Allow-Methods']='POST, OPTIONS';
    headers['Access-Control-Allow-Headers']='Content-Type';
    if(req.url!=='/api/visits'){send(404,{error:'Ruta no encontrada'});return;}
    if(req.method==='OPTIONS'){res.writeHead(204,headers);res.end();return;}
    if(req.method!=='POST'){send(405,{error:'Método no permitido'});return;}
    if(!req.headers['content-type']?.startsWith('application/json')){send(415,{error:'Se requiere JSON'});return;}
    try{
      let body='';
      for await(const chunk of req){body+=chunk;if(Buffer.byteLength(body)>1024){send(413,{error:'Solicitud demasiado grande'});return;}}
      let data;try{data=JSON.parse(body);}catch{send(400,{error:'JSON inválido'});return;}
      if(typeof data.sessionId!=='string'||!/^[-a-zA-Z0-9]{16,80}$/.test(data.sessionId)){send(400,{error:'Sesión inválida'});return;}
      const visitNumber=await register(data.sessionId);
      send(200,{visitNumber,metric:'registered-session'});
    }catch{send(503,{error:'Contador no disponible'});}
  });
}
if(process.argv[1]&&import.meta.url===pathToFileURL(resolve(process.argv[1])).href){
  const origins=(process.env.ALLOWED_ORIGINS||'http://localhost:5173').split(',').map(x=>x.trim());
  const server=await createCounter({file:resolve(process.env.COUNTER_FILE||'server/data/visits.json'),origins});
  server.requestTimeout=10000;
  server.listen(Number(process.env.PORT||8787),'0.0.0.0',()=>console.log('Contador disponible en /api/visits'));
}
