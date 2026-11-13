import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { profile } from '../content';
import { personalFacts, choose } from '../localized-content';
import { LanguageSelector } from '../Language';
import { useLanguage } from '../locale-context';
import { readSetting, saveSetting, registerVisit } from './experience-state';
import Games from './Games';
import './experience.css';

const poses = Object.fromEntries(Object.entries(import.meta.glob('../assets/avatar/*.png', {eager:true, query:'?url', import:'default'})).map(([path,url])=>[path.split('/').pop().replace('.png',''),url]));
function Character({pose='wave', className=''}) {
    const [frame,setFrame] = useState(0);
    useEffect(()=>{if(pose!=='walk')return;const timer=setInterval(()=>setFrame(value=>(value+1)%8),110);return()=>clearInterval(timer);},[pose]);
    return <img aria-hidden="true" alt="" className={`companion-image ${className}`} src={poses[pose==='walk'?`step-${frame+1}`:pose]||poses.wave}/>;
}
function Butterfly({className='',style}) {
    return <svg className={className} style={style} viewBox="0 0 64 52" fill="none" aria-hidden="true"><path d="M31 27C22 0 0 1 5 21c2 8 11 11 20 11C3 31 13 54 26 43l6-12M33 27C42 0 64 1 59 21c-2 8-11 11-20 11 22-1 12 22-1 11l-6-12" fill="currentColor"/><path d="M32 40V21m0 2-6-9m6 9 6-9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/></svg>;
}
function Modal({label,children,onClose,className=''}) {
    const { tx } = useLanguage();
    const dialog = useRef(null);
    useEffect(()=>{const previous=document.activeElement,node=dialog.current;node.showModal();return()=>{node.close();if(previous instanceof HTMLElement)previous.focus();};},[]);
    return <dialog ref={dialog} className={`experience-modal ${className}`} aria-label={label} onCancel={e=>{e.preventDefault();onClose();}}><button className="modal-close" onClick={onClose} aria-label={tx('Cerrar ventana','Close window','Fermer la fenêtre')}>×</button><LanguageSelector/>{children}</dialog>;
}
function useTip(pathname) {
    const { tx } = useLanguage();
    const tips={
        '/':[tx('¡Hola! Soy Saraí.','Hi! I’m Saraí.','Salut ! Moi, c’est Saraí.'),tx('Puedes conocer mi perfil, explorar proyectos o jugar un momento. Tú eliges por dónde comenzar.','Explore my profile, discover projects or play for a moment. You choose where to start.','Découvrez mon profil, explorez mes projets ou jouez un moment. À vous de choisir.'),'/sobre-mi'],
        '/sobre-mi':[tx('Estamos en Sobre Mí.','We’re in About Me.','Nous sommes dans À propos.'),tx('Aquí te cuento mis intereses, fortalezas, herramientas y auxiliaturas. También puedes consultar mi CV.','Here you can learn about my interests, strengths, tools and teaching assistant roles. You can also view my résumé.','Découvrez ici mes intérêts, mes points forts, mes outils et mes expériences d’auxiliaire. Vous pouvez aussi consulter mon CV.'),'/sobre-mi'],
        '/portafolio':[tx('Estamos en proyectos.','We’re exploring projects.','Nous explorons les projets.'),tx('Aquí presento algunos proyectos de mi recorrido. Puedes explorar sus fichas y descubrir cómo aporté en cada uno.','Here are projects from my journey. Explore their details and discover how I contributed to each one.','Voici des projets de mon parcours. Consultez leurs fiches pour découvrir ma contribution à chacun.'),'/portafolio'],
        '/blog':[tx('Un espacio para compartir.','A place to share.','Un espace de partage.'),tx('En el blog comparto preguntas y aprendizajes sobre diseño y tecnología. Elige una entrada que te dé curiosidad.','In the blog I share questions and lessons about design and technology. Pick an entry that sparks your curiosity.','Sur le blog, je partage des questions et des apprentissages sur le design et la technologie. Choisissez un article qui vous intrigue.'),'/blog'],
        '/contacto':[tx('Una conversación puede ser el comienzo.','A conversation can be the beginning.','Une conversation peut être un début.'),tx('Puedes escribirme o conectar en mis redes. El formulario prepara un correo; tú decides cuándo enviarlo.','Email me or connect on my social profiles. The form prepares an email; you decide when to send it.','Écrivez-moi ou rejoignez-moi sur mes réseaux. Le formulaire prépare un e-mail ; vous décidez quand l’envoyer.'),'/contacto'],
    };
    return tips[pathname]||tips['/blog'];
}
function clampPosition(p) {
    const maxX=Math.max(8,window.innerWidth-170),maxY=Math.max(8,window.innerHeight-240);
    return {x:Math.max(8,Math.min(Number(p?.x)||maxX,maxX)),y:Math.max(8,Math.min(Number(p?.y)||maxY,maxY))};
}
function Companion({motion,onGame,onWelcome,onMotion,blocked}) {
    const { pathname } = useLocation();
    const { language,tx } = useLanguage();
    const tip = useTip(pathname);
    const [sleeping,setSleeping] = useState(()=>readSetting('companion-sleeping',window.matchMedia('(max-width: 640px)').matches)===true);
    const [panel,setPanel] = useState(false);
    const [position,setPosition] = useState(()=>clampPosition(readSetting('companion-position',null)));
    const [pose,setPose] = useState('wave');
    const [direction,setDirection] = useState(1);
    const [dragging,setDragging] = useState(false);
    const [fact,setFact] = useState(0);
    const [dismissed,setDismissed] = useState([]);
    const drag = useRef(null),toggle = useRef(null),cycle = useRef(0);
    const arrival = !sleeping&&!panel&&!blocked&&!dismissed.includes(pathname);
    useEffect(()=>{const resize=()=>setPosition(p=>clampPosition(p));window.addEventListener('resize',resize);return()=>window.removeEventListener('resize',resize);},[]);
    useEffect(()=>{
        if(!motion||sleeping||panel||dragging||blocked||arrival)return;
        let timer;
        const interval=setInterval(()=>{
            if(document.hidden)return;
            cycle.current++;
            if(cycle.current%2===0){setPose('sit');return;}
            const dir=cycle.current%4===1?-1:1;
            setDirection(dir);setPose('walk');
            setPosition(p=>clampPosition({...p,x:p.x+dir*100}));
            timer=setTimeout(()=>setPose('sit'),2600);
        },6500);
        return()=>{clearInterval(interval);clearTimeout(timer);};
    },[motion,sleeping,panel,dragging,blocked,arrival]);
    function dismissArrival(){setDismissed(previous=>previous.includes(pathname)?previous:[...previous,pathname]);}
    function sleep(){setSleeping(true);saveSetting('companion-sleeping',true);setPanel(false);dismissArrival();requestAnimationFrame(()=>toggle.current?.focus());}
    function wake(){setSleeping(false);saveSetting('companion-sleeping',false);setPose('wave');}
    function move(x,y){setPosition(p=>{const next=clampPosition({x:p.x+x,y:p.y+y});saveSetting('companion-position',next);return next;});}
    function pointerDown(e){if(e.button!==0)return;drag.current={x:e.clientX,y:e.clientY,start:position};e.currentTarget.setPointerCapture(e.pointerId);setDragging(true);}
    function pointerMove(e){if(!drag.current)return;setPosition(clampPosition({x:drag.current.start.x+e.clientX-drag.current.x,y:drag.current.start.y+e.clientY-drag.current.y}));}
    function pointerUp(){if(!drag.current)return;drag.current=null;setDragging(false);saveSetting('companion-position',position);}
    const renderedPose=!motion||blocked?'wave':panel||arrival?'point':pose;
    const moveLabel=tx('Mover: arrastra o usa las flechas del teclado','Move: drag or use the arrow keys','Déplacer : faites glisser ou utilisez les flèches');
    return <>{arrival&&<section className="arrival-note" aria-live="polite"><button className="modal-close" onClick={dismissArrival} aria-label={tx('Cerrar presentación de sección','Close section introduction','Fermer la présentation de section')}>×</button><h2>{tip[0]}</h2><p>{tip[1]}</p></section>}<aside className={`companion ${sleeping?'sleeping':''} ${dragging?'is-dragging':''} ${motion&&pose==='walk'&&!blocked&&!arrival?'roaming':''}`} style={{left:position.x,top:position.y}} aria-label={tx('Acompañante de Saraí','Saraí’s companion','Compagnon de Saraí')} onKeyDown={e=>{if(e.key==='Escape'){setPanel(false);dismissArrival();toggle.current?.focus();}}}>
        {panel&&!sleeping&&!blocked&&<section className="companion-panel" aria-label={tx('Ayuda de Saraí','Saraí’s guide','Guide de Saraí')}><button className="modal-close" aria-label={tx('Cerrar ayuda','Close guide','Fermer le guide')} onClick={()=>{setPanel(false);toggle.current?.focus();}}>×</button><h2>{tip[0]}</h2><p>{tip[1]}</p><div className="fact-box"><p>{choose(personalFacts[fact],language)}</p><button onClick={()=>setFact(value=>(value+1)%personalFacts.length)}>{tx('Otro dato sobre mí','Another fact about me','Un autre détail sur moi')} ↻</button></div><div className="companion-tools"><Link to="/portafolio" onClick={()=>setPanel(false)}>{tx('▤ Explorar proyectos','▤ Explore projects','▤ Explorer les projets')}</Link><Link to="/sobre-mi" onClick={()=>setPanel(false)}>{tx('♡ Formación, auxiliaturas y CV','♡ Studies, teaching roles and résumé','♡ Formation, auxiliariats et CV')}</Link><Link to="/contacto" onClick={()=>setPanel(false)}>{tx('✉ Conectar conmigo','✉ Connect with me','✉ Me contacter')}</Link><button onClick={()=>{setPanel(false);onGame();}}>{tx('✦ Jugar','✦ Play','✦ Jouer')}</button><button onClick={()=>{setPanel(false);onWelcome();}}>{tx('Ver bienvenida','Show welcome','Voir l’accueil')}</button><button onClick={onMotion}>{motion?tx('Pausar movimientos','Pause motion','Suspendre les animations'):tx('Activar movimientos','Enable motion','Activer les animations')}</button><button onClick={sleep}>{tx('Dejarme descansar','Let me rest','Me laisser me reposer')}</button></div><small>{moveLabel}. {tx('Mensajes preparados, sin voz.','Prepared messages, no voice.','Messages préparés, sans voix.')}</small></section>}
        <button className="drag-handle" aria-label={moveLabel} title={moveLabel} onPointerDown={pointerDown} onPointerMove={pointerMove} onPointerUp={pointerUp} onPointerCancel={pointerUp} onKeyDown={e=>{const directions={ArrowLeft:[-24,0],ArrowRight:[24,0],ArrowUp:[0,-24],ArrowDown:[0,24]};if(directions[e.key]){e.preventDefault();move(...directions[e.key]);}}}>↔ <span>{tx('Mover','Move','Déplacer')}</span></button>
        {sleeping?<button ref={toggle} className="moon-home" onClick={wake} aria-label={tx('Despertar a Saraí','Wake Saraí','Réveiller Saraí')}><Character pose="sleep"/><span className="sleep-zzz" aria-hidden="true">z z z</span><small>{tx('Saraí descansa · despertar','Saraí is resting · wake up','Saraí se repose · réveiller')}</small></button>:<><button ref={toggle} className="character-button" aria-expanded={panel} aria-label={tx('Abrir o cerrar ayuda de Saraí','Open or close Saraí’s guide','Ouvrir ou fermer le guide de Saraí')} onClick={()=>{dismissArrival();setPanel(!panel);}}><Character pose={renderedPose} className={renderedPose==='walk'&&direction<0?'facing-left':''}/><span className="info-bubble" aria-hidden="true">i ✦</span><span className="character-caption">{tx('¿Te cuento algo?','Want to know more?','Je vous raconte ?')}</span></button><button className="sleep-button" onClick={sleep}>☾ {tx('Descansar','Rest','Se reposer')}</button></>}
    </aside></>;
}
export default function CreativeExperience() {
    const { language,tx } = useLanguage();
    const [reduced,setReduced] = useState(()=>window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    const [paused,setPaused] = useState(()=>readSetting('motion-paused',window.matchMedia('(max-width: 640px)').matches)===true);
    const [welcome,setWelcome] = useState(()=>!window.matchMedia('(max-width: 640px)').matches&&!readSetting('welcome-dismissed',false,true));
    const [game,setGame] = useState(false),[visit,setVisit]=useState(null),[found,setFound]=useState(false);
    const motion=!reduced&&!paused;
    useEffect(()=>{const mq=window.matchMedia('(prefers-reduced-motion: reduce)');const change=()=>setReduced(mq.matches);mq.addEventListener('change',change);return()=>mq.removeEventListener('change',change);},[]);
    useEffect(()=>{document.documentElement.dataset.motion=motion?'on':'off';},[motion]);
    useEffect(()=>{let active=true;registerVisit(profile.visitEndpoint).then(number=>{if(active)setVisit(number);});return()=>{active=false;};},[]);
    function closeWelcome(){saveSetting('welcome-dismissed',true,true);setWelcome(false);}
    function toggleMotion(){setPaused(value=>{saveSetting('motion-paused',!value);return !value;});}
    return <><div className="butterfly-garden" aria-hidden="true">{Array.from({length:12},(_,i)=><Butterfly key={i} style={{left:`${(i*29+3)%97}%`,top:`${(i*23+7)%95}%`,'--delay':`${-i*1.9}s`,'--size':`${24+(i%3)*17}px`}}/>)}</div><div className="experience-bar"><span>{tx('Un pequeño jardín de ideas','A little garden of ideas','Un petit jardin d’idées')}</span><button onClick={()=>setWelcome(true)}>{tx('Bienvenida','Welcome','Bienvenue')}</button><button onClick={()=>setGame(true)}>✦ {tx('Juegos','Games','Jeux')}</button><button onClick={toggleMotion} disabled={reduced}>{reduced?tx('Movimiento reducido del sistema','System reduced motion','Animations réduites du système'):motion?tx('Ⅱ Pausar animaciones','Ⅱ Pause animations','Ⅱ Suspendre les animations'):tx('▷ Activar animaciones','▷ Enable animations','▷ Activer les animations')}</button></div><button className="secret-butterfly" onClick={()=>setFound(!found)} aria-expanded={found} aria-label={tx('Mariposa con una pista','Butterfly with a hint','Papillon avec un indice')}><Butterfly/><span>{tx('Una pista','A hint','Un indice')}</span></button>{found&&<div className="secret-note" role="status"><p>{tx('La creatividad también vive en hacer las cosas más claras.','Creativity also means making things clearer.','La créativité consiste aussi à rendre les choses plus claires.')}</p><button onClick={()=>{setFound(false);setGame(true);}}>{tx('Explorar jugando','Explore by playing','Explorer en jouant')} →</button><button onClick={()=>setFound(false)} aria-label={tx('Cerrar pista','Close hint','Fermer l’indice')}>×</button></div>}
        <Companion motion={motion} onGame={()=>setGame(true)} onWelcome={()=>setWelcome(true)} onMotion={toggleMotion} blocked={welcome||game}/>
        {welcome&&<Modal label={tx('Bienvenida','Welcome','Bienvenue')} onClose={closeWelcome} className="welcome-modal"><div className="welcome-illustration"><Character pose="celebrate"/><span aria-hidden="true" className="welcome-spark">✦</span></div><p className="eyebrow">{tx('Qué bonito encontrarte aquí','Lovely to meet you here','Quel plaisir de vous voir ici')}</p><h2>{tx('¡Una mente creativa','A creative mind','Un esprit créatif')}<br/><em>{tx('acaba de llegar!','has just arrived!','vient d’arriver !')}</em></h2>{visit&&<p className="visit-number">{tx('Visita registrada n.º','Registered visit no.','Visite enregistrée n°')} {visit.toLocaleString(language)}</p>}<p>{tx('Soy Saraí. Te invito a conocer mis ideas, explorar lo que construyo y conectar para crear algo en el futuro.','I’m Saraí. Explore my ideas and work, and let’s connect to create something in the future.','Je suis Saraí. Découvrez mes idées et mes projets, et échangeons pour créer quelque chose ensemble à l’avenir.')}</p>{visit&&<p className="small-note">{tx('El contador registra sesiones, no personas únicas.','The counter records sessions, not unique people.','Le compteur enregistre des sessions, pas des personnes uniques.')}</p>}<div className="actions"><Link className="button" to="/sobre-mi" onClick={closeWelcome}>{tx('Quiero conocerte','Get to know you','Faire connaissance')} →</Link><button className="button secondary" onClick={()=>{closeWelcome();setGame(true);}}>{tx('Explorar jugando','Explore by playing','Explorer en jouant')} ✦</button></div><button className="quiet-button" onClick={closeWelcome}>{tx('Prefiero recorrer la página','I’ll explore the site','Je préfère parcourir le site')}</button></Modal>}
        {game&&<Modal label={tx('Jardín de juegos','Game garden','Jardin de jeux')} onClose={()=>setGame(false)} className="game-modal"><Games onClose={()=>setGame(false)}/></Modal>}
    </>;
}
