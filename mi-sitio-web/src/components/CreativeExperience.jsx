import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { profile } from '../content';
import { readSetting, saveSetting, registerVisit } from './experience-state';
import sheet from '../assets/personaje.png';
import './experience.css';

// El atlas de cuerpo completo tiene cuatro columnas y dos filas.
const atlas = new URL('../assets/companion-atlas.png', import.meta.url).href;
function Character({pose='wave', className=''}) { return <span aria-hidden="true" className={`companion-art pose-${pose} ${className}`} style={{backgroundImage:`url(${atlas})`}}/>; }
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
const challenges = [
  {title:'Un botón que no te haga adivinar', context:'El formulario abre la aplicación de correo de la persona. ¿Qué etiqueta explica mejor lo que va a pasar?', options:['Enviar mensaje ahora','Abrir mi correo con este mensaje','Continuar'], answer:1, why:'Una etiqueta concreta anticipa la acción. Abrir un borrador no significa que el correo ya fue enviado.'},
  {title:'Tu movimiento, tus reglas', context:'Una acompañante animada recorre la página. ¿Cómo le darías control al visitante?', options:['Que siga moviéndose siempre','Esconder la opción de pausa','Ofrecer pausa y una luna para guardarla'], answer:2, why:'Una interacción puede ser divertida y opcional. Pausar o guardar la acompañante deja espacio para concentrarse.'},
  {title:'Que el proyecto hable por ti', context:'Vas a presentar un trabajo en equipo. ¿Qué ayuda más a comprender tu contribución?', options:['Una captura y una explicación de lo que hice','Solo el nombre del proyecto','Una lista de cualidades sin ejemplos'], answer:0, why:'La evidencia y tu responsabilidad concreta explican mejor tu aporte que un adjetivo. Esa es la idea de mi portafolio.'},
];
function CreativeGame({onClose}) {
  const [step,setStep] = useState(0);
  const [choice,setChoice] = useState(null);
  const [complete,setComplete] = useState(false);
  const heading = useRef(null);
  const question = challenges[step];
  const correct = choice === question.answer;
  function next(){if(step===challenges.length-1){setComplete(true);saveSetting('creative-game-completed',true);}else{setStep(step+1);setChoice(null);}requestAnimationFrame(()=>heading.current?.focus());}
  return <Modal label="Minijuego: tres decisiones de diseño" onClose={onClose} className="game-modal"><p className="eyebrow">Laboratorio creativo · sin cronómetro</p>{complete?<><Character pose="celebrate"/><h2 ref={heading} tabIndex="-1">¡Tres decisiones con sentido!</h2><p>Tu insignia: <strong>Mirada creativa</strong>. Has explorado claridad, control y evidencia: tres ideas que quiero llevar a mi trabajo.</p><p className="small-note">El progreso se guarda solo en este navegador, cuando el almacenamiento está disponible.</p><div className="actions"><Link className="button" to="/portafolio" onClick={onClose}>Ver estas ideas en mi portafolio</Link><button className="button secondary" onClick={()=>{setStep(0);setChoice(null);setComplete(false);}}>Volver a jugar</button></div></>:<><p className="game-progress">Decisión {step+1} de {challenges.length}</p><h2 ref={heading} tabIndex="-1">{question.title}</h2><p>{question.context}</p><div className="game-options">{question.options.map((text,i)=><button key={`${step}-${i}`} aria-pressed={choice===i} className={choice===i ? correct?'chosen correct':'chosen retry':''} disabled={correct} onClick={()=>setChoice(i)}><span>{String.fromCharCode(65+i)}</span>{text}</button>)}</div><div aria-live="polite" className="game-feedback">{choice!==null&&(correct?<p>✓ {question.why}</p>:<p>Piensa en lo que la persona necesita saber o controlar. Puedes probar otra opción; aquí no hay penalizaciones.</p>)}</div>{correct&&<button className="button" onClick={next}>{step===2?'Descubrir mi insignia':'Siguiente decisión →'}</button>}</>}</Modal>;
}
const contextualTips = {
  '/': ['Soy Saraí, en versión ilustrada.', 'Te acompaño a explorar. En el portafolio encontrarás lo que construyo y en Mi esencia, mi recorrido.', '/sobre-mi','Conocer a Saraí'],
  '/sobre-mi': ['Detrás de esta página hay una persona.', 'Aquí puedes abrir mi CV y conocer mi formación. Mi video estará disponible cuando termine de grabarlo.', '/portafolio','Explorar proyectos'],
  '/portafolio': ['No todo se ve en una captura.', 'Abre «Mi aporte y proceso» para conocer la participación, herramientas y propósito de cada proyecto.', '/contacto','Hablemos de un proyecto'],
  '/blog': ['Las ideas también se comparten.', 'En mi bitácora encontrarás preguntas y ejemplos sobre diseño, código y aprendizaje.', '/blog','Explorar la bitácora'],
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
    {panel&&!sleeping&&<section className="companion-panel" aria-label="Ayuda de Saraí"><button className="modal-close" aria-label="Cerrar ayuda" onClick={()=>{setPanel(false);toggle.current?.focus();}}>×</button><h2>{tip[0]}</h2><p>{tip[1]}</p><Link className="text-link" to={tip[2]} onClick={()=>setPanel(false)}>{tip[3]} →</Link><div className="companion-tools"><button onClick={()=>{setPanel(false);onGame();}}>✦ Jugar con una idea</button><button onClick={()=>{setPanel(false);onWelcome();}}>♡ Ver bienvenida</button><button onClick={onMotion}>{motion?'Ⅱ Pausar movimientos':'▷ Activar movimientos'}</button><button onClick={sleep}>☾ Guardar en la luna</button></div><small>Puedes moverme arrastrando el asa ↔ o usando sus teclas de flecha. Guía con mensajes preparados.</small></section>}
    <button className="drag-handle" aria-label="Mover acompañante: arrastra o usa las flechas del teclado" title="Arrástrame o usa las flechas" onPointerDown={pointerDown} onPointerMove={pointerMove} onPointerUp={pointerUp} onPointerCancel={pointerUp} onKeyDown={e=>{const movements={ArrowLeft:[-24,0],ArrowRight:[24,0],ArrowUp:[0,-24],ArrowDown:[0,24]};if(movements[e.key]){e.preventDefault();move(...movements[e.key]);}}}>↔ <span>Mover</span></button>
    {sleeping?<button ref={toggle} className="moon-home" onClick={wake} aria-label="Despertar a Saraí y mostrar acompañante"><span aria-hidden="true">☾</span><small>Saraí descansa · abrir</small></button>:<><button ref={toggle} className="character-button" aria-expanded={panel} aria-label="Abrir o cerrar información de Saraí" onClick={()=>setPanel(!panel)}><Character pose={renderedPose} className={renderedPose==='walk'&&direction<0?'facing-left':''}/><span className="info-bubble" aria-hidden="true">i ✦</span><span className="character-caption">¿Te cuento algo?</span></button><button className="sleep-button" onClick={sleep} aria-label="Guardar a Saraí en la luna">☾ Descansar</button></>}
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
  return <><div className="butterfly-garden" aria-hidden="true">{Array.from({length:12},(_,i)=><Butterfly key={i} style={{left:`${(i*29+3)%97}%`,top:`${(i*23+7)%95}%`,'--delay':`${-i*1.9}s`,'--size':`${24+(i%3)*17}px`}}/>)}</div><div className="experience-bar"><span>Un pequeño jardín de ideas</span><button onClick={()=>setGame(true)}>✦ Jugar: 3 decisiones creativas</button><button onClick={toggleMotion} disabled={reduced}>{reduced?'Movimiento reducido del sistema':motion?'Ⅱ Pausar animaciones':'▷ Activar animaciones'}</button></div><button className="secret-butterfly" onClick={()=>setFound(!found)} aria-expanded={found} aria-label="Mariposa con una pista creativa"><Butterfly/> <span>Una pista</span></button>{found&&<div className="secret-note" role="status"><p>Encontraste una idea: la creatividad también vive en hacer las cosas más claras.</p><button onClick={()=>{setFound(false);setGame(true);}}>Probar el minijuego →</button><button onClick={()=>setFound(false)} aria-label="Cerrar pista">×</button></div>}
  <Companion motion={motion} onGame={()=>setGame(true)} onWelcome={()=>setWelcome(true)} onMotion={toggleMotion}/>
  {welcome&&<Modal label="Bienvenida al espacio de Saraí" onClose={closeWelcome} className="welcome-modal"><div className="welcome-illustration"><span style={{backgroundImage:`url(${sheet})`}}/><span aria-hidden="true" className="welcome-spark">✦</span></div><p className="eyebrow">Qué bonito encontrarte aquí</p><h2>¡Una mente creativa<br/><em>acaba de llegar!</em></h2>{visit&&<p className="visit-number">Visita registrada n.º {visit.toLocaleString('es-GT')}</p>}<p>Soy Saraí. Te invito a conocer mis ideas, explorar lo que construyo y conectar para crear algo en el futuro.</p>{visit&&<p className="small-note">El contador registra sesiones de visita, no personas únicas.</p>}<div className="actions"><Link className="button" to="/sobre-mi" onClick={closeWelcome}>Quiero conocerte →</Link><button className="button secondary" onClick={()=>{closeWelcome();setGame(true);}}>Explorar jugando ✦</button></div><button className="quiet-button" onClick={closeWelcome}>Prefiero recorrer la página</button></Modal>}
  {game&&<CreativeGame onClose={()=>setGame(false)}/>}
  </>;
}
