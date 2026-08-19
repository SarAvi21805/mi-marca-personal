const AboutMe = () => {
  return (
    <div className="max-w-4xl mx-auto py-16 px-6">
      <h2 className="text-4xl font-bold text-gray-900 mb-8">Sobre Mí</h2>
      
      <div className="grid md:grid-cols-3 gap-10">
        <div className="md:col-span-2 space-y-6 text-lg text-gray-700 leading-relaxed">
          <p>
            ¡Hola! Soy <span className="font-bold text-brand-purple">Saraí Avilés</span>, estudiante de tercer año de 
            Ingeniería en Ciencias de la Computación. Me defino como una persona 
            <span className="italic"> empática y resiliente</span>, con un deseo genuino de ayudar a los demás.
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
              <li className="flex items-center gap-2">Creatividad ilimitada</li>
              <li className="flex items-center gap-2">Empatía profunda</li>
              <li className="flex items-center gap-2">Pensamiento lateral</li>
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
    </div>
  );
};

export default AboutMe;