const Contact = () => (
  <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
    <h2 className="text-4xl font-bold text-brand-purple mb-4">¡Hablemos!</h2>
    <p className="text-xl text-gray-600 max-w-md">
      Estoy abierta a nuevas oportunidades y colaboraciones donde la tecnología y el diseño se unan.
    </p>
    <div className="mt-8">
      <a href="mailto:alejandraviles2005@gmail.com">
        <button className="px-8 py-3 bg-brand-green text-white rounded-full font-bold hover:scale-105 transition-all shadow-lg">
          Enviar un correo
        </button>
      </a>
    </div>
  </div>
);

export default Contact;