const Blog = () => {
  return (
    <article className="max-w-3xl mx-auto py-16 px-6 font-sans text-gray-800">
      <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
        Más allá del código: <span className="text-brand-purple font-black underline decoration-brand-purple/20">3 secretos</span> detrás de mi marca personal como <span className="text-brand-green font-black">ingeniera UX</span>
      </h1>

      <p className="text-xl text-gray-600 mb-8 leading-relaxed italic border-l-4 border-brand-green pl-4">
        Descubrir quiénes somos en el entorno digital es el primer paso para conectar con el mundo de forma auténtica. 
      </p>

      <div className="space-y-8 text-lg leading-relaxed text-justify">
        
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4 italic">1. La tecnología con propósito humano</h2>
          <p>
            Muchos creen que la ingeniería se trata solo de algoritmos fríos. Sin embargo, <strong className="font-black text-gray-900">mi marca personal se basa en la creencia de que el código debe servir a las personas.</strong> Como estudiante de 
            <a href="https://www.uvg.edu.gt/carreras/computacion-y-tecnologias-de-la-informacion/" target="_blank" className="text-brand-purple hover:underline mx-1">Ingeniería en Ciencias de la Computación</a>, 
            busco que cada proyecto tenga un impacto positivo. <strong className="font-black text-gray-900">Mi objetivo es eliminar la frustración tecnológica a través de un diseño empático.</strong>
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4 italic">2. Mi arquetipo: La pureza del Inocente</h2>
          <p>
            Dentro de los patrones de marca, me identifico con el arquetipo del Inocente y el Cuidador. 
            <strong className="font-black text-gray-900">Esto significa que mi comunicación es honesta, optimista y siempre orientada a brindar soluciones prácticas.</strong> 
            Busco que mis interfaces transmitan paz y sencillez a los usuarios, evitando la complejidad innecesaria. 
            <strong className="font-black text-gray-900">Esta visión me permite abordar problemas técnicos desde una perspectiva de ayuda y bienestar común.</strong>
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4 italic">3. El valor del Diseño UX en la ingeniería</h2>
          <p>
            La creatividad es la herramienta que me permite pensar de forma distinta frente a los desafíos. 
            <strong className="font-black text-gray-900">Unir el diseño de experiencia de usuario con el backend es mi mayor diferenciador profesional.</strong> 
            No solo me importa que un sistema sea eficiente, sino que sea visualmente atractivo. 
            Al aplicar herramientas de <a href="https://www.nngroup.com/articles/definition-user-experience/" target="_blank" className="text-brand-purple hover:underline mx-1">Diseño UX</a>, 
            <strong className="font-black text-gray-900">aseguro que la tecnología sea accesible para todos desde cualquier parte del mundo.</strong>
          </p>
        </section>

        <div className="bg-slate-100 p-8 rounded-2xl mt-12 text-center">
          <p className="mb-6 font-bold">
            ¿Te gustaría conocer más sobre mis proyectos de diseño y programación?
          </p>
          <a href="https://www.linkedin.com/in/alejandra-avil%C3%A9s-3886b5408/" target="_blank" rel="noopener noreferrer">
            <button className="bg-brand-green text-white px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform shadow-md">
              ¡Hablemos por LinkedIn!
            </button>
          </a>
        </div>
      </div>
    </article>
  );
};

export default Blog;