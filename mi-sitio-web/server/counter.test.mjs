import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {createCounter} from './counter.mjs';

test('persistencia, concurrencia, sesión repetida y validación',async()=>{
 const directory=await mkdtemp(join(tmpdir(),'sarai-counter-'));
 let server;
 try{
  const options={file:join(directory,'visits.json'),origins:['http://localhost:5173']};
  server=await createCounter(options);
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
  let url=`http://127.0.0.1:${server.address().port}/api/visits`;
  const post=(sessionId,origin='http://localhost:5173')=>fetch(url,{method:'POST',headers:{Origin:origin,'Content-Type':'application/json'},body:JSON.stringify({sessionId})});
  const id='first-session-123456789';
  const results=await Promise.all(Array.from({length:8},()=>post(id).then(r=>r.json())));
  assert.ok(results.every(r=>r.visitNumber===1));
  const distinct=await Promise.all(Array.from({length:6},(_,i)=>post(`other-session-123456-${i}`).then(r=>r.json())));
  assert.deepEqual(distinct.map(r=>r.visitNumber).sort((a,b)=>a-b),[2,3,4,5,6,7]);
  assert.equal((await post('bad')).status,400);
  assert.equal((await post(id,'https://untrusted.example')).status,403);
  const preflight=await fetch(url,{method:'OPTIONS',headers:{Origin:'http://localhost:5173'}});
  assert.equal(preflight.status,204);
  assert.equal(preflight.headers.get('access-control-allow-origin'),'http://localhost:5173');
  const malformed=await fetch(url,{method:'POST',headers:{Origin:'http://localhost:5173','Content-Type':'application/json'},body:'{'});
  assert.equal(malformed.status,400);
  await new Promise(resolve=>server.close(resolve));
  server=await createCounter(options);
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
  url=`http://127.0.0.1:${server.address().port}/api/visits`;
  assert.equal((await (await post(id)).json()).visitNumber,1);
  assert.equal((await (await post('next-session-123456789')).json()).visitNumber,8);
 }finally{if(server?.listening)await new Promise(resolve=>server.close(resolve));await rm(directory,{recursive:true,force:true});}
});
