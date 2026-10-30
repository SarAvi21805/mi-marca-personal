import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { profile } from '../content';
import { readSetting, saveSetting, registerVisit } from './experience-state';
import './experience.css';

const poses = Object.fromEntries(Object.entries(import.meta.glob('../assets/avatar/*.png', {eager:true, query:'?url', import:'default'})).map(([path,url])=>[path.split('/').pop().replace('.png',''),url]));
function Character({pose='wave', className=''}) {
 const [frame,setFrame]=useState(0);
 useEffect(()=>{if(pose!=='walk')return;const timer=setInterval(()=>setFrame(value=>(value+1)%4),200);return()=>clearInterval(timer);},[pose]);
 return <img aria-hidden="true" alt="" className={`companion-image ${className}`} src={poses[pose==='walk'?`walk-${frame+1}`:pose]||poses.wave}/>;
}
function Butterfly({className='', style}) { return <svg className={className} style={style} viewBox="0 0 64 52" fill="none" aria-hidden="true"><path d="M31 27C22 0 0 1 5 21c2 8 11 11 20 11C3 31 13 54 26 43l6-12M33 27C42 0 64 1 59 21c-2 8-11 11-20 11 22-1 12 22-1 11l-6-12" fill="currentColor"/><path d="M32 40V21m0 2-6-9m6 9 6-9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/></svg>; }
function Modal({label, children, onClose, className=''}) {
  const dialog = useRef(null);
  useEffect(() => {
    const previous = document.activeElement;
    const node = dialog.current;
    node.showModal();
    return () => { node.close(); if (previous instanceof HTMLElement) previous.focus(); };
  }, []);
  return <dialog ref={dialog} className={`experience-modal ${className}`} aria-label={label} onCancel={e=>{e.preventDefault();onClose();}} onClick={e=>{if(e.target===dialog.current){const r=dialog.current.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)onClose();}}}><button className="modal-close" onClick={onClose} aria-label="Cerrar ventana">×</button>{children}</dialog>;
}
const memorySymbols = ['🦋','🌷','💻','🎨'];
function makeCards(){const cards=memorySymbols.flatMap(symbol=>[symbol,symbol]).map((symbol,id)=>({symbol,id}));for(let i=cards.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[cards[i],cards[j]]=[cards[j],cards[i]];}return cards;}

function CreativeGame({onClose}) {
 const [cards,setCards]=useState(makeCards);
 const [flipped,setFlipped]=useState([]);
 const [matched,setMatched]=useState([]);
 const [turns,setTurns]=useState(0);
 const complete=matched.length===cards.length;
 useEffect(()=>{
  if(flipped.length!==2)return;
  const [a,b]=flipped;
  const same=cards[a].symbol===cards[b].symbol;
  const timer=setTimeout(()=>{if(same)setMatched(previous=>[...previous,a,b]);setFlipped([]);},same?400:1000);
  return ()=>clearTimeout(timer);
 },[flipped,cards]);
 function choose(index){if(flipped.length===2||flipped.includes(index)||matched.includes(index))return;setFlipped(previous=>[...previous,index]);if(flipped.length===1)setTurns(value=>value+1);}
 function restart(){setCards(makeCards());setFlipped([]);setMatched([]);setTurns(0);}
 return <Modal label="Memorama del jardín creativo" onClose={onClose} className="game-modal"><p className="eyebrow">Un descanso para explorar</p><h2>Encuentra las parejas</h2><p>Toca dos cartas y encuentra las cuatro parejas. Sin reloj ni conocimientos previos: solo curiosidad.</p><div className="memory-grid">{cards.map((card,i)=>{const visible=flipped.includes(i)||matched.includes(i);return <button key={card.id} className={visible?'memory-card revealed':'memory-card'} disabled={matched.includes(i)||flipped.length===2} aria-label={visible?`Carta ${i+1}: ${card.symbol}${matched.includes(i)?', pareja encontrada':''}`:`Revelar carta ${i+1}`} onClick={()=>choose(i)}>{visible?card.symbol:'✦'}</button>;})}</div><p role="status">{matched.length/2} de 4 parejas · {turns} intentos{complete?' · ¡Jardín completo!':''}</p>{complete&&<><Character pose="celebrate"/><p>Las mariposas representan curiosidad; las flores, crecimiento; el código y el arte, las dos partes que me gusta unir.</p><Link className="button" to="/portafolio" onClick={onClose}>Conocer mis proyectos →</Link></>}<button className="quiet-button" onClick={restart}>Mezclar y comenzar de nuevo</button></Modal>;
}
const contextualTips = {
  '/': ['Soy Saraí, en versión ilustrada.', 'Te acompaño a explorar. En el portafolio encontrarás lo que construyo y en Sobre Mí, mi recorrido.', '/sobre-mi','Conocer a Saraí'],
  '/sobre-mi': ['Detrás de esta página hay una persona.', 'Aquí puedes abrir mi CV y conocer mi formación. Mi video estará disponible cuando termine de grabarlo.', '/portafolio','Explorar proyectos'],
  '/portafolio': ['No todo se ve en una captura.', 'Abre «Mi aporte y proceso» para conocer la participación, herramientas y propósito de cada proyecto.', '/contacto','Hablemos de un proyecto'],
  '/blog': ['Las ideas también se comparten.', 'En mi blogs encontrarás preguntas y ejemplos sobre diseño, código y aprendizaje.', '/blog','Explorar la blogs'],
  '/contacto': ['Una conversación es un buen comienzo.', 'Puedes escribirme por correo o visitar mis redes. El formulario prepara un borrador y tú decides cuándo enviarlo.', '/sobre-mi','Ver mi perfil'],
};
function clampPosition(p){const maxX=Math.max(8,window.innerWidth-170);const maxY=Math.max(8,window.innerHeight-240);return {x:Math.max(8,Math.min(Number(p?.x)||maxX,maxX)),y:Math.max(8,Math.min(Number(p?.y)||maxY,maxY))};}
function Companion({motion, onGame, onWelcome, onMotion}) {
  const {pathname}=useLocation();
  const [sleeping,setSleeping] = useState(()=>readSetting('companion-sleeping',false)===true);
  const [panel,setPanel] = useState(false);
  const [position,setPosition] = useState(()=>clampPosition(readSetting('companion-position',null)));
  const [pose,setPose] = useState('wave');
  const [direction,setDirection] = useState(1);
  const [dragging,setDragging] = useState(false);
  const drag=useRef(null);
  const toggle=useRef(null);
  const tip = contextualTips[pathname] || contextualTips['/blog'];
  useEffect(()=>{const resize=()=>setPosition(p=>clampPosition(p));window.addEventListener('resize',resize);return ()=>window.removeEventListener('resize',resize);},[]);
  useEffect(()=>{
    if(!motion || sleeping || panel || dragging) return;
    let timer;
    let cycle=0;
    const interval=setInterval(()=>{
      if(document.hidden || document.querySelector('dialog[open]'))return;
      cycle++;
      if(cycle%2===0){setPose('sit');return;}
      const dir=cycle%4===1?-1:1;
      setDirection(dir);setPose('walk');
      setPosition(p=>clampPosition({...p,x:p.x+dir*100}));
      timer=setTimeout(()=>setPose('sit'),2600);
    },6500);
    return ()=>{clearInterval(interval);clearTimeout(timer);};
  },[motion,sleeping,panel,dragging]);
  function sleep(){setSleeping(true);saveSetting('companion-sleeping',true);setPanel(false);requestAnimationFrame(()=>toggle.current?.focus());}
  function wake(){setSleeping(false);saveSetting('companion-sleeping',false);setPose('wave');}
  function move(x,y){setPosition(p=>{const next=clampPosition({x:p.x+x,y:p.y+y});saveSetting('companion-position',next);return next;});}
  function pointerDown(e){if(e.button!==0)return;drag.current={x:e.clientX,y:e.clientY,start:position};e.currentTarget.setPointerCapture(e.pointerId);setDragging(true);}
  function pointerMove(e){if(!drag.current)return;setPosition(clampPosition({x:drag.current.start.x+e.clientX-drag.current.x,y:drag.current.start.y+e.clientY-drag.current.y}));}
  function pointerUp(){if(!drag.current)return;drag.current=null;setDragging(false);saveSetting('companion-position',position);}
  const renderedPose = !motion?'wave':panel?'point':pose;
  return <aside className={`companion ${sleeping?'sleeping':''} ${dragging?'is-dragging':''} ${motion&&pose==='walk'?'roaming':''}`} style={{left:position.x,top:position.y}} aria-label="Acompañante de Saraí" onKeyDown={e=>{if(e.key==='Escape'){setPanel(false);toggle.current?.focus();}}}>
    {panel&&!sleeping&&<section className="companion-panel" aria-label="Ayuda de Saraí"><button className="modal-close" aria-label="Cerrar ayuda" onClick={()=>{setPanel(false);toggle.current?.focus();}}>×</button><h2>{tip[0]}</h2><p>{tip[1]}</p><Link className="text-link" to={tip[2]} onClick={()=>setPanel(false)}>{tip[3]} →</Link><div className="companion-tools"><button onClick={()=>{setPanel(false);onGame();}}>✦ Jugar con una idea</button><button onClick={()=>{setPanel(false);onWelcome();}}>♡ Ver bienvenida</button><Link to="/sobre-mi" onClick={()=>setPanel(false)}>▤ Mi formación y CV</Link><Link to="/contacto" onClick={()=>setPanel(false)}>✉ Cómo conectar conmigo</Link><button onClick={onMotion}>{motion?'Ⅱ Pausar movimientos':'▷ Activar movimientos'}</button><button onClick={sleep}>☾ Dejarme descansar</button></div><small>Puedes moverme arrastrando el asa ↔ o usando sus teclas de flecha. Guía con mensajes preparados.</small></section>}
    <button className="drag-handle" aria-label="Mover acompañante: arrastra o usa las flechas del teclado" title="Arrástrame o usa las flechas" onPointerDown={pointerDown} onPointerMove={pointerMove} onPointerUp={pointerUp} onPointerCancel={pointerUp} onKeyDown={e=>{const movements={ArrowLeft:[-24,0],ArrowRight:[24,0],ArrowUp:[0,-24],ArrowDown:[0,24]};if(movements[e.key]){e.preventDefault();move(...movements[e.key]);}}}>↔ <span>Mover</span></button>
    {sleeping?<button ref={toggle} className="moon-home" onClick={wake} aria-label="Despertar a Saraí y mostrar acompañante"><Character pose="sleep"/><span className="sleep-zzz" aria-hidden="true">z z z</span><small>Saraí descansa · despertar</small></button>:<><button ref={toggle} className="character-button" aria-expanded={panel} aria-label="Abrir o cerrar información de Saraí" onClick={()=>setPanel(!panel)}><Character pose={renderedPose} className={renderedPose==='walk'&&direction<0?'facing-left':''}/><span className="info-bubble" aria-hidden="true">i ✦</span><span className="character-caption">¿Te cuento algo?</span></button><button className="sleep-button" onClick={sleep} aria-label="Guardar a Saraí en la luna">☾ Descansar</button></>}
  </aside>;
}
export default function CreativeExperience(){
  const [reduced,setReduced]=useState(()=>window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [paused,setPaused]=useState(()=>readSetting('motion-paused',false)===true);
  const [welcome,setWelcome]=useState(()=>!readSetting('welcome-dismissed',false,true));
  const [game,setGame]=useState(false);
  const [visit,setVisit]=useState(null);
  const [found,setFound]=useState(false);
  const motion=!reduced&&!paused;
  useEffect(()=>{const mq=window.matchMedia('(prefers-reduced-motion: reduce)');const change=()=>setReduced(mq.matches);mq.addEventListener('change',change);return()=>mq.removeEventListener('change',change);},[]);
  useEffect(()=>{document.documentElement.dataset.motion=motion?'on':'off';},[motion]);
  useEffect(()=>{let active=true;registerVisit(profile.visitEndpoint).then(number=>{if(active)setVisit(number);});return()=>{active=false;};},[]);
  function closeWelcome(){saveSetting('welcome-dismissed',true,true);setWelcome(false);}
  function toggleMotion(){setPaused(value=>{saveSetting('motion-paused',!value);return !value;});}
  return <><div className="butterfly-garden" aria-hidden="true">{Array.from({length:12},(_,i)=><Butterfly key={i} style={{left:`${(i*29+3)%97}%`,top:`${(i*23+7)%95}%`,'--delay':`${-i*1.9}s`,'--size':`${24+(i%3)*17}px`}}/>)}</div><div className="experience-bar"><span>Un pequeño jardín de ideas</span><button onClick={()=>setGame(true)}>✦ Jugar al memorama</button><button onClick={toggleMotion} disabled={reduced}>{reduced?'Movimiento reducido del sistema':motion?'Ⅱ Pausar animaciones':'▷ Activar animaciones'}</button></div><button className="secret-butterfly" onClick={()=>setFound(!found)} aria-expanded={found} aria-label="Mariposa con una pista creativa"><Butterfly/> <span>Una pista</span></button>{found&&<div className="secret-note" role="status"><p>Encontraste una idea: la creatividad también vive en hacer las cosas más claras.</p><button onClick={()=>{setFound(false);setGame(true);}}>Probar el minijuego →</button><button onClick={()=>setFound(false)} aria-label="Cerrar pista">×</button></div>}
  <Companion motion={motion} onGame={()=>setGame(true)} onWelcome={()=>setWelcome(true)} onMotion={toggleMotion}/>
  {welcome&&<Modal label="Bienvenida al espacio de Saraí" onClose={closeWelcome} className="welcome-modal"><div className="welcome-illustration"><Character pose="celebrate"/><span aria-hidden="true" className="welcome-spark">✦</span></div><p className="eyebrow">Qué bonito encontrarte aquí</p><h2>¡Una mente creativa<br/><em>acaba de llegar!</em></h2>{visit&&<p className="visit-number">Visita registrada n.º {visit.toLocaleString('es-GT')}</p>}<p>Soy Saraí. Te invito a conocer mis ideas, explorar lo que construyo y conectar para crear algo en el futuro.</p>{visit&&<p className="small-note">El contador registra sesiones de visita, no personas únicas.</p>}<div className="actions"><Link className="button" to="/sobre-mi" onClick={closeWelcome}>Quiero conocerte →</Link><button className="button secondary" onClick={()=>{closeWelcome();setGame(true);}}>Explorar jugando ✦</button></div><button className="quiet-button" onClick={closeWelcome}>Prefiero recorrer la página</button></Modal>}
  {game&&<CreativeGame onClose={()=>setGame(false)}/>}
  </>;
}
