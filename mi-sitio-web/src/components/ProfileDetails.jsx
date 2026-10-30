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
    return (
        <section className="profile-details" aria-labelledby="skills-heading">
            <div className="profile-value-grid">
                <article className="panel">
                    <p className="eyebrow">Cómo abordo mi trabajo</p>
                    <h2>Mis fortalezas</h2>
                    <ul className="strength-list">
                        <li><strong>Empatía.</strong> Me interesa entender las necesidades de quien está al otro lado de la pantalla.</li>
                        <li><strong>Creatividad.</strong> Disfruto explorar maneras visuales de explicar y resolver una idea.</li>
                        <li><strong>Aprendizaje autónomo.</strong> Busco comprender las herramientas que necesito para avanzar.</li>
                        <li><strong>Resiliencia.</strong> Estoy dispuesta a revisar, corregir y volver a intentar.</li>
                        <li><strong>Trabajo en equipo.</strong> Valoro escuchar otras perspectivas y recibir retroalimentación.</li>
                    </ul>
                </article>
                <article className="panel value-card">
                    <p className="eyebrow">Tecnología con empatía</p>
                    <h2>¿Qué ofrezco al mundo?</h2>
                    <p>Una mirada que conecta lógica y sensibilidad: me interesa convertir necesidades en interfaces claras, útiles y visualmente cuidadas.</p>
                    <p>Como estudiante, puedo aportar ideas, desarrollo de interfaces y disposición para aprender. Busco un entorno colaborativo donde compartir conocimientos, recibir orientación y construir soluciones con propósito.</p>
                    <p className="value-signature">Comprender · Proponer · Construir · Mejorar</p>
                </article>
            </div>

            <header className="skills-heading">
                <p className="eyebrow">Mi caja de herramientas</p>
                <h2 id="skills-heading">Lo que he explorado y utilizado</h2>
                <p>Tecnologías y herramientas de mi formación y mis proyectos. Mi experiencia varía entre ellas; en el portafolio explico dónde las he aplicado.</p>
            </header>
            <div className="skill-category-grid">
                {skillGroups.map(group => (
                    <article className="panel skill-category" key={group.title}>
                        <span className="skill-symbol" aria-hidden="true">{group.icon}</span>
                        <h3>{group.title}</h3>
                        <p>{group.description}</p>
                        <ul className="technology-list">
                            {group.items.slice(0, 6).map(item => <li key={item}>{item}</li>)}
                        </ul>
                        {group.items.length > 6 && (
                            <details>
                                <summary>Más conocimientos y herramientas ({group.items.length - 6})</summary>
                                <ul className="technology-list">
                                    {group.items.slice(6).map(item => <li key={item}>{item}</li>)}
                                </ul>
                            </details>
                        )}
                    </article>
                ))}
            </div>
        </section>
    );
}
