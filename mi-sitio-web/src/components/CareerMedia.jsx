import { Link } from 'react-router-dom';
import { useLanguage } from '../locale-context';
import { profile, mediaPath } from '../content';

export default function CareerMedia() {
    const { language, tx } = useLanguage();
    const localizedCv = profile.cvByLanguage[language];
    const cv = localizedCv ? mediaPath(localizedCv) : profile.cv;
    const video = profile.videoByLanguage[language];
    const captions = profile.captionsByLanguage[language];

    return (
        <div className="media-grid">
            <article className="panel">
                <p className="eyebrow">{tx('Mi recorrido · CV', 'My journey · Résumé', 'Mon parcours · CV')}</p>
                <h2>{tx('Conoce lo que puedo aportar.', 'Discover what I can contribute.', 'Découvrez ce que je peux apporter.')}</h2>
                <p>{tx(
                    'Te invito a conocer más de mí: mi formación, las herramientas que utilizo y las experiencias con las que sigo creciendo. ¿Imaginamos lo que podríamos crear juntos?',
                    'Get to know my education, the tools I use and the experiences that help me grow. What could we create together?',
                    'Découvrez ma formation, les outils que j’utilise et les expériences qui me font grandir. Que pourrions-nous créer ensemble ?'
                )}</p>
                {!localizedCv && <p className="note">{tx(
                    'Por ahora, el documento reúne mis versiones en español e inglés.',
                    'For now, this document includes my Spanish and English versions.',
                    'La version française est en préparation. Le document disponible contient les versions espagnole et anglaise.'
                )}</p>}
                <div className="actions">
                    <a className="button" href={cv} target="_blank" rel="noreferrer">{tx('Explorar mi CV', 'Explore my résumé', 'Découvrir mon CV')} ↗</a>
                    <a className="text-link" href={cv} download={localizedCv ? `CV-Sarai-Aviles-${language}.pdf` : 'CV-Sarai-Aviles-ES-EN.pdf'}>{tx('Guardar mi CV', 'Save my résumé', 'Télécharger mon CV')} ↓</a>
                </div>
            </article>
            <article className="panel">
                <p className="eyebrow">{tx('Mi video CV', 'My video résumé', 'Ma présentation vidéo')}</p>
                <h2>{tx('Conóceme más allá del código.', 'Meet the person behind the code.', 'Découvrez la personne derrière le code.')}</h2>
                <p>{tx(
                    'Una mirada a lo que me inspira, cómo conecto creatividad y tecnología, y lo que busco aportar a un equipo.',
                    'A glimpse of what inspires me, how I connect creativity and technology, and what I hope to contribute to a team.',
                    'Un aperçu de mes inspirations, de ma façon de relier créativité et technologie, et de ce que je souhaite apporter à une équipe.'
                )}</p>
                {video ? (
                    <video key={language + video} controls preload="metadata" poster={mediaPath(`media/video-cv-${language}.jpg`)} aria-label={tx('Conoce mi historia', 'Discover my story', 'Découvrez mon histoire')}>
                        <source src={mediaPath(video)} type="video/mp4"/>
                        {captions && <track default kind="captions" srcLang={language} label={{es:'Español',en:'English',fr:'Français'}[language]} src={mediaPath(captions)}/>}
                        <a href={mediaPath(video)}>{tx('Abrir mi video', 'Open my video', 'Ouvrir ma vidéo')}</a>
                    </video>
                ) : <p className="note">{tx(
                    'Estoy preparando mi presentación en español. Mientras tanto, te invito a descubrir mis proyectos.',
                    'My English introduction is in preparation. In the meantime, explore my projects.',
                    'Ma présentation en français est en préparation. En attendant, découvrez mes projets.'
                )}</p>}
                <Link className="text-link" to="/portafolio">{tx('Descubre lo que he creado', 'Discover what I’ve built', 'Découvrez mes réalisations')} →</Link>
            </article>
        </div>
    );
}
