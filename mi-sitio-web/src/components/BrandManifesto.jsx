import { Link } from 'react-router-dom';
import { useLanguage } from '../locale-context';

export default function BrandManifesto() {
    const { tx } = useLanguage();
    const values = [
        tx('Empatía: escuchar antes de proponer.', 'Empathy: listen before proposing.', 'Empathie : écouter avant de proposer.'),
        tx('Honestidad: reconocer lo que sé y lo que aún estoy aprendiendo.', 'Honesty: acknowledge what I know and what I am still learning.', 'Honnêteté : reconnaître mes acquis et ce que j’apprends encore.'),
        tx('Creatividad: explorar distintas formas de resolver un problema.', 'Creativity: explore different ways to solve a problem.', 'Créativité : explorer plusieurs façons de résoudre un problème.'),
        tx('Perseverancia: recibir comentarios, ajustar y volver a intentar.', 'Perseverance: welcome feedback, adjust and try again.', 'Persévérance : accueillir les retours, ajuster et réessayer.')
    ];
    return (
        <section className="brand-manifesto panel" id="manifiesto" aria-labelledby="manifesto-title">
            <p className="eyebrow">{tx('Mi manifiesto de marca', 'My brand manifesto', 'Mon manifeste de marque')}</p>
            <h2 id="manifesto-title">{tx('Crear con lógica. Conectar con empatía.', 'Create with logic. Connect with empathy.', 'Créer avec logique. Relier avec empathie.')}</h2>
            <div className="manifesto-layout"><div className="manifesto-copy">
                <p>{tx(
                    'Soy Saraí. Creo en una tecnología que empieza por escuchar y en un diseño que ayuda a las personas a encontrar su siguiente paso. Me mueve convertir ideas en interfaces claras, útiles y con identidad.',
                    'I’m Saraí. I believe in technology that begins with listening and design that helps people find their next step. I am driven to turn ideas into clear, useful interfaces with an identity of their own.',
                    'Je suis Saraí. Je crois en une technologie qui commence par l’écoute et en un design qui aide chacun à trouver sa prochaine étape. Ce qui me motive, c’est transformer des idées en interfaces claires, utiles et singulières.'
                )}</p>
                <p>{tx(
                    'Mi curiosidad une el código con el dibujo, los colores y las ganas de ayudar. Elijo trabajar con empatía, honestidad y respeto: preguntar antes de asumir, reconocer el aporte de mi equipo y aprender de lo que todavía no me sale.',
                    'My curiosity connects code with drawing, color and the desire to help. I choose empathy, honesty and respect: asking before assuming, recognizing my team’s contributions and learning from what I have not mastered yet.',
                    'Ma curiosité relie le code au dessin, aux couleurs et à l’envie d’aider. Je choisis l’empathie, l’honnêteté et le respect : questionner avant de supposer, reconnaître les contributions de mon équipe et apprendre de ce que je ne maîtrise pas encore.'
                )}</p>
                <p>{tx(
                    'Quiero crecer entre el desarrollo frontend y el diseño UX, en equipos donde pueda aportar ideas y seguir aprendiendo. Me comprometo a escuchar, probar y mejorar, incluso cuando dar el primer paso me dé miedo. Ese es el impacto que busco: hacer que la tecnología se sienta más cercana, comprensible y humana.',
                    'I want to grow between frontend development and UX design, in teams where I can contribute ideas and keep learning. I commit to listening, trying and improving, even when the first step feels daunting. That is the impact I seek: technology that feels more approachable, understandable and human.',
                    'Je souhaite évoluer entre le développement frontend et le design UX, au sein d’équipes où apporter des idées et continuer à apprendre. Je m’engage à écouter, essayer et améliorer, même lorsque le premier pas me fait peur. Voilà l’impact que je recherche : une technologie plus proche, compréhensible et humaine.'
                )}</p>
            </div>
            <aside className="manifesto-aside"><h3>{tx('Los valores que guían mi trabajo', 'The values behind my work', 'Les valeurs qui guident mon travail')}</h3>
            <ul className="manifesto-values">{values.map(value => <li key={value}>{value}</li>)}</ul></aside></div>
            <Link className="text-link" to="/portafolio">{tx('Conoce cómo lo llevo a mis proyectos', 'See how I bring this to my projects', 'Découvrez comment cela nourrit mes projets')} →</Link>
        </section>
    );
}
