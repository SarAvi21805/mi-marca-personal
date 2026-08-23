const AboutMe = () => {
  return (
    <div className="max-w-4xl mx-auto py-16 px-6">
      <h2 className="text-4xl font-bold text-gray-900 mb-8">Sobre mí</h2>
      
      <div className="grid md:grid-cols-3 gap-10">
        <div className="md:col-span-2 space-y-6 text-lg text-gray-700 leading-relaxed">
          <p>
            ¡Hola! Soy <span className="font-bold text-brand-purple">Saraí</span> <span className="font-bold text-brand-green">Avilés</span>, me defino como una persona 
            <span className="italic text-brand-blue"> empática y resiliente</span>, con un deseo genuino de ayudar a los demás.
          </p>
          <p>
            Mi enfoque profesional une lo mejor de dos mundos: la rigidez de la ingeniería con la 
            sensibilidad del Diseño UX. Me apasiona crear interfaces que no solo funcionen perfectamente, 
            sino que también brinden paz y soluciones prácticas a quienes las usan.
          </p>
          
          <div className="bg-brand-green/5 p-6 rounded-2xl border-l-4 border-brand-green">
            <h4 className="font-bold text-brand-green mb-2">¿Qué ofrezco al mundo?</h4>
            <p className="text-sm">
              Apoyo y consuelo a través de la tecnología. Busco resolver problemas técnicos complejos 
              mediante soluciones sencillas, visualmente atractivas y centradas en el ser humano.
            </p>
          </div>
        </div>

        {/* Sidebar de Habilidades/Fortalezas */}
        <div className="space-y-6">
          <div>
            <h4 className="font-bold text-gray-900 mb-3 underline decoration-brand-purple decoration-2">Fortalezas</h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">♦ Creatividad ilimitada</li>
              <li className="flex items-center gap-2">♦ Empatía profunda</li>
              <li className="flex items-center gap-2">♦ Pensamiento lateral</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-gray-900 mb-3 underline decoration-brand-green decoration-2">Skills</h4>
            <div className="flex flex-wrap gap-2">
              {['Diseño UX', 'React', 'HTML/CSS', 'Guías de estilo', 'UX Writing'].map(skill => (
                <span key={skill} className="bg-white border border-gray-200 px-3 py-1 rounded-full text-xs font-semibold shadow-sm">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto py-16 px-6 space-y-20">
      
        {/* SECCIÓN 1: BIOGRAFÍA & ESTUDIANTE */}
        <section className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-gray-900 italic">Más que líneas de código</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Como <span className="font-bold text-brand-blue">primer hija</span>, crecí con un sentido intrínseco de responsabilidad y cuidado. Hoy, curso mi <span className="font-bold text-brand-blue">tercer año</span> de <span className="font-bold text-brand-blue">Ingeniería en Ciencias de la Computación</span> en la UVG, donde he descubierto que mi verdadera pasión no es solo programar, sino <span className="font-bold text-brand-blue">humanizar la tecnología</span>. 
            </p>
            <p className="text-lg text-gray-700">
              Me considero una estudiante <span className="font-bold text-brand-blue">curiosa y resiliente</span>. No me conformo con que un sistema funcione; me obsesiona entender <span className="font-bold text-brand-blue">cómo se siente el usuario</span> al interactuar con él. Mi enfoque está en el <span className="font-bold text-brand-blue">Diseño UX</span>, donde puedo mezclar la lógica matemática con la empatía visual.
            </p>
          </div>
          <div className="bg-brand-purple/5 p-8 rounded-3xl border border-brand-purple/10">
            <h3 className="text-xl font-bold text-brand-purple mb-4">Mis Valores de Marca</h3>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <span className="text-brand-green">✓</span>
                <span>Empatía Radical: Ponerme en los zapatos del usuario antes de escribir la primera etiqueta HTML.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-brand-green">✓</span>
                <span>Resiliencia Creativa: Ver los errores de compilación como oportunidades para diseñar algo mejor.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-brand-green">✓</span>
                <span>Integridad Profesional: Mantener mis valores y mi deseo de ayudar en cada línea de código.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* SECCIÓN 2: TECH STACK & SKILLS */}
        <section className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100">
          <h2 className="text-3xl font-bold text-center mb-12">Mi Arsenal Técnico</h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="space-y-4">
              <div className="text-4xl">🎨</div>
              <h4 className="font-bold text-brand-purple">Diseño & UX</h4>
              <p className="text-sm text-gray-500">Creación de paletas, Guías de estilo, Prototipado en Figma, UX Research.</p>
            </div>
            <div className="space-y-4">
              <div className="text-4xl">💻</div>
              <h4 className="font-bold text-brand-purple">Frontend</h4>
              <p className="text-sm text-gray-500">React.js, Tailwind CSS, HTML5 semántico, CSS3 moderno.</p>
            </div>
            <div className="space-y-4">
              <div className="text-4xl">⚙️</div>
              <h4 className="font-bold text-brand-purple">Ingeniería</h4>
              <p className="text-sm text-gray-500">Programación lógica, Estructuras de datos, Control de versiones (Git/GitHub).</p>
            </div>
          </div>
        </section>

        {/* SECCIÓN 3: PROYECTOS / EXPERIENCIA */}
        <section className="space-y-8">
          <h2 className="text-3xl font-bold text-gray-900">Proyectos con Corazón</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border border-gray-100 p-6 rounded-2xl hover:shadow-md transition-shadow">
              <h4 className="font-bold text-lg mb-2">Desarrollo de Marca Personal</h4>
              <p className="text-gray-600 text-sm">Creación de este sitio web desde cero usando React y Tailwind, aplicando principios de accesibilidad y psicología del color.</p>
            </div>
            <div className="border border-gray-100 p-6 rounded-2xl hover:shadow-md transition-shadow">
              <h4 className="font-bold text-lg mb-2">Interfaces de Usuario (UX)</h4>
              <p className="text-gray-600 text-sm">Participación en proyectos universitarios de diseño visual, enfocándome en la creación de guías de estilo consistente.</p>
            </div>
          </div>
        </section>
      </div>    
    </div>
  );
};

export default AboutMe;