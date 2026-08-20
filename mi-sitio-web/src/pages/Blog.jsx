const Blog = () => {
  return (
    <article className="max-w-3xl mx-auto py-16 px-6 font-sans text-gray-800">
      {/* 3a. Titular con cifras y palabras clave */}
      <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
        Cómo soy como marca: <span className="text-brand-purple">3 pilares</span> que definen mi identidad profesional
      </h1>

      {/* 4. Lead que conecte (sin clichés) */}
      <p className="text-xl text-gray-600 mb-8 leading-relaxed italic border-l-4 border-brand-green pl-4">
        Descubrir quiénes somos en el entorno digital es el primer paso para conectar con el mundo de forma auténtica. 
        En este post, exploro cómo mi formación técnica y mi visión humana se fusionan.
      </p>

      {/* Cuerpo del post - Párrafos de 4-6 líneas (Punto 1a) */}
      <div className="space-y-8 text-lg leading-relaxed">
        
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">1. La tecnología con propósito humano</h2>
          <p>
            Muchos creen que la ingeniería se trata solo de lógica y algoritmos fríos. Sin embargo, mi marca personal 
            se basa en la creencia de que el código debe servir a las personas. Como estudiante de 
            <a href="https://www.uvg.edu.gt/" target="_blank" className="text-brand-purple hover:underline ml-1">Ingeniería en Ciencias de la Computación</a>, 
            busco que cada proyecto tenga un impacto positivo. Mi objetivo es crear soluciones que faciliten la vida, 
            eliminando la frustración tecnológica a través de un diseño empático.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Mi arquetipo: La pureza del Inocente</h2>
          <p>
            Dentro de los patrones de marca, me identifico con el arquetipo del Inocente y el Cuidador. 
            Esto significa que mi comunicación es honesta, optimista y siempre orientada a brindar soluciones prácticas. 
            Busco que mis interfaces transmitan paz y sencillez a los usuarios, evitando la complejidad innecesaria. 
            Esta visión me permite abordar problemas técnicos desde una perspectiva de ayuda y bienestar común.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">3. El valor del Diseño UX en la ingeniería</h2>
          <p>
            La creatividad es la herramienta que me permite pensar de forma distinta frente a los desafíos. 
            Unir el diseño de experiencia de usuario con el backend es mi mayor diferenciador profesional. 
            No solo me importa que un sistema sea eficiente, sino que sea visualmente atractivo. 
            Al aplicar herramientas de <a href="https://www.nngroup.com/articles/definition-user-experience/" target="_blank" className="text-brand-purple hover:underline">Diseño UX</a>, 
            aseguro que la tecnología sea accesible para todos desde cualquier parte del mundo.
          </p>
        </section>

        {/* 5. Cierre con Call to Action */}
        <div className="bg-slate-100 p-8 rounded-2xl mt-12">
          <p className="mb-6 font-bold">
            Construir una marca personal es un viaje constante de autodescubrimiento y resiliencia. 
            ¿Te gustaría conocer más sobre mis proyectos de diseño y programación?
          </p>
          <button className="bg-brand-green text-white px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform shadow-md">
            ¡Hablemos por LinkedIn!
          </button>
        </div>
      </div>
    </article>
  );
};

export default Blog;