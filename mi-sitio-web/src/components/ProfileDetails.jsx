import { useLanguage } from '../locale-context';

const skillGroups = [
    {
        title: 'Diseño y experiencia de usuario',
        icon: '✦',
        description: 'Organizar ideas, explorar propuestas visuales y pensar en quien utilizará la interfaz.',
        items: ['Figma', 'Canva', 'Guías de estilo', 'Paletas de color', 'UX Writing', 'UX Research', 'Adobe Suite · básico'],
    },
    {
        title: 'Desarrollo web y móvil',
        icon: '⌘',
        description: 'Convertir una propuesta visual en pantallas e interacciones funcionales.',
        items: ['React', 'Vite', 'HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'Tailwind CSS', 'Sass', 'Vue.js', 'Kotlin', 'C#', '.NET'],
    },
    {
        title: 'Lógica, datos y backend',
        icon: '⌬',
        description: 'Construir la lógica de las aplicaciones y trabajar con sus datos.',
        items: ['Java', 'Python', 'Go', 'C++', 'Lisp', 'Assembler · fundamentos', 'Estructuras de datos', 'Node.js', 'API REST', 'SQL', 'PostgreSQL', 'MySQL', 'MongoDB', 'Firebase Authentication'],
    },
    {
        title: 'Herramientas y trabajo técnico',
        icon: '⚙',
        description: 'Versionar, probar y organizar el desarrollo de mis proyectos.',
        items: ['Git', 'GitHub', 'GitHub Pages', 'VS Code', 'Android Studio', 'Docker', 'Postman', 'TablePlus', 'Bash', 'Linux / WSL', 'Arduino IDE', 'LiveWire', 'Greenfoot', 'Metodologías ágiles'],
    },
];

export default function ProfileDetails() {
    const { tx } = useLanguage();
    const labels = {
        'Diseño y experiencia de usuario': tx('Diseño y experiencia de usuario', 'Design and user experience', 'Design et expérience utilisateur'),
        'Desarrollo web y móvil': tx('Desarrollo web y móvil', 'Web and mobile development', 'Développement web et mobile'),
        'Lógica, datos y backend': tx('Lógica, datos y backend', 'Logic, data and backend', 'Logique, données et backend'),
        'Herramientas y trabajo técnico': tx('Herramientas y trabajo técnico', 'Tools and technical work', 'Outils et travail technique'),
        'Guías de estilo': tx('Guías de estilo', 'Style guides', 'Guides de style'),
        'Paletas de color': tx('Paletas de color', 'Color palettes', 'Palettes de couleurs'),
        'Adobe Suite · básico': tx('Adobe Suite · básico', 'Adobe Suite · basics', 'Adobe Suite · bases'),
        'Assembler · fundamentos': tx('Assembler · fundamentos', 'Assembly · fundamentals', 'Assembleur · notions'),
        'Estructuras de datos': tx('Estructuras de datos', 'Data structures', 'Structures de données'),
        'Metodologías ágiles': tx('Metodologías ágiles', 'Agile methods', 'Méthodes agiles'),
    };
    const descriptions = [
        tx('Organizar ideas y pensar en quien utilizará la interfaz.', 'Organize ideas and think about the person using the interface.', 'Organiser les idées et penser à la personne qui utilisera l’interface.'),
        tx('Convertir una propuesta visual en pantallas funcionales.', 'Turn a visual concept into functional screens.', 'Transformer une proposition visuelle en écrans fonctionnels.'),
        tx('Construir la lógica de las aplicaciones y trabajar con datos.', 'Build application logic and work with data.', 'Construire la logique des applications et travailler avec les données.'),
        tx('Versionar, probar y organizar mis proyectos.', 'Version, test and organize my projects.', 'Versionner, tester et organiser mes projets.'),
    ];
    return (
        <section className="profile-details" aria-labelledby="skills-heading">
            <div className="profile-value-grid">
                <article className="panel">
                    <p className="eyebrow">{tx("Cómo abordo mi trabajo", "How I approach my work", "Mon approche du travail")}</p>
                    <h2>{tx("Mis fortalezas", "My strengths", "Mes points forts")}</h2>
                    <ul className="strength-list">
                        <li><strong>{tx("Empatía.", "Empathy.", "Empathie.")}</strong>{tx(" Me interesa entender las necesidades de quien está al otro lado de la pantalla.", " I want to understand the needs of the person on the other side of the screen.", " Je souhaite comprendre les besoins de la personne de l’autre côté de l’écran.")}</li>
                        <li><strong>{tx("Creatividad.", "Creativity.", "Créativité.")}</strong>{tx(" Disfruto explorar maneras visuales de explicar y resolver una idea.", " I enjoy exploring visual ways to explain and develop an idea.", " J’aime explorer des façons visuelles d’expliquer et de développer une idée.")}</li>
                        <li><strong>{tx("Aprendizaje autónomo.", "Independent learning.", "Apprentissage autonome.")}</strong>{tx(" Busco comprender las herramientas que necesito para avanzar.", " I work to understand the tools I need to move forward.", " Je cherche à comprendre les outils dont j’ai besoin pour avancer.")}</li>
                        <li><strong>{tx("Resiliencia.", "Resilience.", "Résilience.")}</strong>{tx(" Estoy dispuesta a revisar, corregir y volver a intentar.", " I am willing to review, correct and try again.", " Je suis prête à revoir, corriger et réessayer.")}</li>
                        <li><strong>{tx("Trabajo en equipo.", "Teamwork.", "Travail en équipe.")}</strong>{tx(" Valoro escuchar otras perspectivas y recibir retroalimentación.", " I value other perspectives and feedback.", " J’apprécie les autres points de vue et les retours.")}</li>
                    </ul>
                </article>
                <article className="panel value-card">
                    <p className="eyebrow">{tx("Tecnología con empatía", "Technology with empathy", "La technologie avec empathie")}</p>
                    <h2>{tx("¿Qué ofrezco al mundo?", "What can I contribute?", "Que puis-je apporter ?")}</h2>
                    <p>{tx("Una mirada que conecta lógica y sensibilidad: me interesa convertir necesidades en interfaces claras, útiles y visualmente cuidadas.", "A perspective that connects logic and sensitivity: I want to turn needs into clear, useful and carefully designed interfaces.", "Un regard qui relie logique et sensibilité : je souhaite transformer les besoins en interfaces claires, utiles et soignées.")}</p>
                    <p>{tx("Como estudiante, puedo aportar ideas, desarrollo de interfaces y disposición para aprender. Busco un entorno colaborativo donde compartir conocimientos, recibir orientación y construir soluciones con propósito.", "As a student, I can contribute ideas, interface development and a willingness to learn. I seek a collaborative environment where I can share knowledge, receive guidance and build purposeful solutions.", "En tant qu’étudiante, je peux apporter des idées, développer des interfaces et apprendre. Je recherche un environnement collaboratif pour partager des connaissances, recevoir des conseils et créer des solutions utiles.")}</p>
                    <p className="value-signature">{tx("Comprender · Proponer · Construir · Mejorar", "Understand · Propose · Build · Improve", "Comprendre · Proposer · Construire · Améliorer")}</p>
                </article>
            </div>

            <header className="skills-heading">
                <p className="eyebrow">{tx("Mi caja de herramientas", "My toolkit", "Ma boîte à outils")}</p>
                <h2 id="skills-heading">{tx("Lo que he explorado y utilizado", "What I have explored and used", "Ce que j’ai exploré et utilisé")}</h2>
                <p>{tx("Tecnologías y herramientas de mi formación y mis proyectos. Mi experiencia varía entre ellas; en el portafolio explico dónde las he aplicado.", "Technologies and tools from my studies and projects. My experience varies; my portfolio explains where I have applied them.", "Technologies et outils de ma formation et de mes projets. Mon expérience varie ; mon portfolio explique où je les ai utilisés.")}</p>
            </header>
            <div className="skill-category-grid">
                {skillGroups.map((group, index) => (
                    <article className="panel skill-category" key={group.title}>
                        <span className="skill-symbol" aria-hidden="true">{group.icon}</span>
                        <h3>{labels[group.title]}</h3>
                        <p>{descriptions[index]}</p>
                        <ul className="technology-list">
                            {group.items.slice(0, 6).map(item => <li key={item}>{labels[item] || item}</li>)}
                        </ul>
                        {group.items.length > 6 && (
                            <details>
                                <summary>{tx('Más conocimientos y herramientas', 'More knowledge and tools', 'Autres connaissances et outils')} ({group.items.length - 6})</summary>
                                <ul className="technology-list">
                                    {group.items.slice(6).map(item => <li key={item}>{labels[item] || item}</li>)}
                                </ul>
                            </details>
                        )}
                    </article>
                ))}
            </div>
        </section>
    );
}
