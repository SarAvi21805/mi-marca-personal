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
      
        {/* BIOGRAFÍA & ESTUDIANTE */}
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

        {/* TECH STACK & SKILLS */}
        <section className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100">
          <h2 className="text-3xl font-bold text-center mb-12">Mi Arsenal Técnico</h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">

            {/* Card 1: Diseño & UX */}
            <div className="space-y-3">
              <div className="text-4xl">🎨</div>
              <h4 className="font-bold text-brand-purple border-b-2 border-brand-purple/20 pb-2">Diseño & UX</h4>
              <p className="text-sm text-gray-500">Es lo que más me gusta, diseñar vistas y aplicaciones funcionales y atractivas, garantizando que los procesos sean intuitivos para el usuario.</p>
              <p className="text-sm text-gray-500">Permite liberar mi creatividad y pensamiento espacial optimizando la presentación de la información y objetos sin saturar la vista.</p>
              <p className="text-sm text-gray-500">Entre lo que suelo realizar incluyo:</p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Prototipado en Figma</li>
                <li>• Creación de Guías de Estilo y paletas</li>
                <li>• Psicología del Color</li>
                <li>• UX Research & Writing</li>
              </ul>
            </div>

            {/* Card 2: Frontend Development */}
            <div className="space-y-3">
              <div className="text-4xl">💻</div>
              <h4 className="font-bold text-brand-purple border-b-2 border-brand-purple/20 pb-2">Frontend</h4>
              <p className="text-sm text-gray-500">Yendo de la mano con el diseño y UX; esta parte me gusta bastante porque me permite ver mis ideas plasmadas en la pantalla de mi computadora mientras programo.</p>
              <p className="text-sm text-gray-500">Dentro de los múltiples lenguajes, suelo utilizar más los siguientes:</p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• React.js & Vite</li>
                <li>• C#, Kotlin</li>
                <li>• Vue.js</li>
                <li>• Tailwind CSS</li>
                <li>• TypeScript</li>
                <li>• JavaScript (ES6+)</li>
                <li>• HTML5 & CSS3 Moderno</li>
              </ul>
            </div>

            {/* Card 3: Ingeniería & Backend */}
            <div className="space-y-3">
              <div className="text-4xl">⚙️</div>
              <h4 className="font-bold text-brand-purple border-b-2 border-brand-purple/20 pb-2">Ingeniería & DB</h4>
              <p className="text-sm text-gray-500">Esta parte no es visual, puesto que requiere la programación lógica para que funcionen las aplicaciones y las conexiones que sean necesarias.</p>
              <p className="text-sm text-gray-500">Al trabajar en esto, suelo manetar el control de versiones mediante GitHub para organizarme mejor.</p>
              <p className="text-sm text-gray-500">Dentro de los lenguajes que más he utilizado se encuentra:</p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Java, Go, Python</li>
                <li>• Assembler, C++, Lisp</li>
                <li>• PostgreSQL, SQL, NoSQL & MySQL</li>
                <li>• Firebase Authentication</li>
                <li>• Estructuras de Datos</li>
                <li>• Estructuras de Datos</li>
                <li>• Node.js & API REST</li>
              </ul>
            </div>

            {/* Card 4: Herramientas */}
            <div className="space-y-3">
              <div className="text-4xl">🐧</div>
              <h4 className="font-bold text-brand-purple border-b-2 border-brand-purple/20 pb-2">Herramientas</h4>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Control de Versiones (Git)</li>
                <li>• Metodologías Ágiles</li>
                <li>• Assembler (Fundamentos)</li>
                <li>• Bash & Linux/WSL</li>
                <li>• TablePlus</li>
                <li>• Docker</li>
                <li>• Visual Studio Code</li>
                <li>• Arduino IDE & LiveWire</li>
                <li>• Postman</li>
                <li>• Android Studio</li>
                
              </ul>
            </div>

          </div>
        </section>

        {/* PROYECTOS / EXPERIENCIA */}
        <section className="space-y-8">
          <h2 className="text-3xl font-bold text-gray-900">Proyectos con Corazón</h2>
          <div className="grid md:grid-cols-2 gap-6">
            
            <div className="border border-gray-100 p-6 rounded-2xl hover:shadow-md transition-shadow">
              <h4 className="font-bold text-lg mb-2">Desarrollo de Marca Personal</h4>
              <p className="text-gray-600 text-sm">Creación de este sitio web desde cero usando React y Tailwind, aplicando principios de accesibilidad y psicología del color.</p>
            </div>

            <div className="border border-gray-100 p-6 rounded-2xl hover:shadow-md transition-shadow">
              <h4 className="font-bold text-lg mb-2">Vive_paso_a_paso</h4>
              <p className="text-gray-600 text-sm">Participación en proyecto con Kotlin para gestionar hábitos saludables, registrar rutinas diarias y motivar al usuario con estadísitcas.</p>
            </div>
            
            <div className="border border-gray-100 p-6 rounded-2xl hover:shadow-md transition-shadow">
              <h4 className="font-bold text-lg mb-2">Kontrol</h4>
              <p className="text-gray-600 text-sm">Participación en plataforma para gestión de proyectos, equiós, inventario y marketing con agente de IA integrado.</p>
            </div>

            <div className="border border-gray-100 p-6 rounded-2xl hover:shadow-md transition-shadow">
              <h4 className="font-bold text-lg mb-2">snake-game</h4>
              <p className="text-gray-600 text-sm">Juego Snake creado con React y Vite. Incluye menú principal, tabla de puntajes, instrucciones, dificultad ajustable, paredes aleatorias, túneles y enemigos.</p>
            </div>

          </div>
        </section>
      </div>    
    </div>
  );
};

export default AboutMe;