import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../locale-context';
import wave from '../assets/avatar/wave.png';
import celebrate from '../assets/avatar/celebrate.png';
import sit from '../assets/avatar/sit.png';
import point from '../assets/avatar/point.png';
import { createWordGrid, selectedLine, matchWord } from './game-utils';

function shuffledCards() {
    const cards = [wave, celebrate, sit, point].flatMap(symbol => [symbol, symbol]).map((symbol,id)=>({symbol,id}));
    for(let i=cards.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[cards[i],cards[j]]=[cards[j],cards[i]];}
    return cards;
}
function WinMessage({ won }) {
    const { tx } = useLanguage();
    // Keep the live region mounted so screen readers announce a completed game.
    return <div role="status" aria-live="polite" aria-atomic="true">
        {won && <div className="game-victory">
            <img src={celebrate} alt="" />
            <div><h3>{tx('¡Ganaste! Tu jardín está completo.', 'You won! Your garden is complete.', 'Bravo ! Votre jardin est complet.')}</h3>
            <p>{tx('Gracias por jugar conmigo. Puedes volver a jugar o explorar mis proyectos.', 'Thanks for playing with me. Play again or explore my projects.', 'Merci d’avoir joué avec moi. Rejouez ou découvrez mes projets.')}</p></div>
        </div>}
    </div>;
}
function MemoryGame() {
    const { tx } = useLanguage();
    const [cards,setCards] = useState(shuffledCards);
    const [flipped,setFlipped] = useState([]);
    const [matched,setMatched] = useState([]);
    const [turns,setTurns] = useState(0);
    useEffect(()=>{
        if(flipped.length!==2)return;
        const [a,b]=flipped, same=cards[a].symbol===cards[b].symbol;
        const timer=setTimeout(()=>{if(same)setMatched(old=>[...old,a,b]);setFlipped([]);},same?400:1000);
        return()=>clearTimeout(timer);
    },[flipped,cards]);
    function choose(index){if(flipped.length===2||flipped.includes(index)||matched.includes(index))return;setFlipped(old=>[...old,index]);if(flipped.length===1)setTurns(value=>value+1);}
    return <><h2>{tx('Encuentra las parejas','Find the pairs','Trouvez les paires')}</h2><p>{tx('Toca dos cartas y encuentra las cuatro parejas. Sin reloj.','Turn over two cards and find all four pairs. No timer.','Retournez deux cartes et trouvez les quatre paires. Sans chronomètre.')}</p><div className="memory-grid">{cards.map((card,i)=>{const visible=flipped.includes(i)||matched.includes(i);return <button key={card.id} className={`memory-card ${visible?'revealed':''}`} disabled={matched.includes(i)||flipped.length===2} aria-label={`${tx('Carta','Card','Carte')} ${i+1}: ${visible?tx(['saludando','celebrando','sentada','señalando'][[wave,celebrate,sit,point].indexOf(card.symbol)],['waving','celebrating','sitting','pointing'][[wave,celebrate,sit,point].indexOf(card.symbol)],['salue','célèbre','assise','montre'][[wave,celebrate,sit,point].indexOf(card.symbol)]):tx('revelar','reveal','révéler')}`} onClick={()=>choose(i)}>{visible?<img src={card.symbol} alt=""/>:'✦'}</button>;})}</div><p role="status">{matched.length/2}/4 {tx('parejas','pairs','paires')} · {turns} {tx('intentos','attempts','essais')}{matched.length===8&&` · ${tx('¡Completado!','Complete!','Terminé !')}`}</p><WinMessage won={matched.length===8}/><button className="quiet-button" onClick={()=>{setCards(shuffledCards());setFlipped([]);setMatched([]);setTurns(0);}}>{tx('Mezclar y reiniciar','Shuffle and restart','Mélanger et recommencer')}</button></>;
}
function WordGame() {
    const { language, tx } = useLanguage();
    const { words,cells,paths } = createWordGrid(language);
    const [start,setStart] = useState(null);
    const [found,setFound] = useState([]);
    const [message,setMessage] = useState('');
    const currentStart=start?.language===language?start.index:null;
    function select(index){
        if(currentStart===null){setStart({language,index});setMessage('start');return;}
        const match=matchWord(selectedLine(currentStart,index),paths);
        if(match>=0){setFound(previous=>previous.includes(match)?previous:[...previous,match]);setMessage('found');}
        else setMessage('retry');
        setStart(null);
    }
    const foundCells=new Set(found.flatMap(index=>paths[index]));
    const messages={start:tx('Ahora elige la última letra.','Now choose the last letter.','Choisissez maintenant la dernière lettre.'),found:tx('¡Palabra encontrada!','Word found!','Mot trouvé !'),retry:tx('No coincide. Prueba de nuevo.','No match. Try again.','Pas de correspondance. Réessayez.')};
    return <><h2>{tx('Palabras que me inspiran','Words that inspire me','Des mots qui m’inspirent')}</h2><p>{tx('Elige la primera y la última letra de una palabra. Pueden ir en horizontal o vertical, en ambos sentidos. También puedes usar Tab y Enter.','Choose the first and last letters of a word. Words run horizontally or vertically in either direction. You can also use Tab and Enter.','Choisissez la première et la dernière lettre d’un mot. Les mots sont horizontaux ou verticaux, dans les deux sens. Vous pouvez aussi utiliser Tab et Entrée.')}</p><div className="word-list">{words.map((word,i)=><span key={i} className={found.includes(i)?'found':''}>{word}</span>)}</div><div className="word-grid" role="group" aria-label={tx('Sopa de letras','Word search','Mots mêlés')}>{cells.map((letter,i)=><button key={i} className={foundCells.has(i)?'found':i===currentStart?'selected':''} aria-pressed={i===currentStart} aria-label={`${tx('Fila','Row','Ligne')} ${Math.floor(i/8)+1}, ${tx('columna','column','colonne')} ${i%8+1}: ${letter}`} onClick={()=>select(i)}>{letter}</button>)}</div><p role="status">{found.length}/4 · {found.length===4?tx('¡Encontraste todas!','You found them all!','Vous les avez tous trouvés !'):messages[message]||tx('Selecciona una letra para comenzar.','Choose a letter to begin.','Choisissez une lettre pour commencer.')}</p><WinMessage won={found.length===4}/><button className="quiet-button" onClick={()=>{setStart(null);setFound([]);setMessage('');}}>{tx('Reiniciar','Restart','Recommencer')}</button></>;
}
export default function Games({onClose}) {
    const { tx } = useLanguage();
    const [tab,setTab] = useState('memory');
    return <><p className="eyebrow">{tx('Un descanso creativo','A creative break','Une pause créative')}</p><div className="game-tabs" role="group" aria-label={tx('Elegir juego','Choose a game','Choisir un jeu')}><button aria-pressed={tab==='memory'} onClick={()=>setTab('memory')}>{tx('Memorama','Memory game','Jeu de mémoire')}</button><button aria-pressed={tab==='words'} onClick={()=>setTab('words')}>{tx('Sopa de letras','Word search','Mots mêlés')}</button></div><div hidden={tab!=='memory'}><MemoryGame/></div><div hidden={tab!=='words'}><WordGame/></div><Link className="text-link" to="/portafolio" onClick={onClose}>{tx('Explorar mis proyectos','Explore my projects','Découvrir mes projets')} →</Link></>;
}
