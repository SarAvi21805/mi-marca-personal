function App() {
  return (
    // min-h-screen ocupa todo el alto, bg-slate-50 es un gris muy claro
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      
      {/* Contenedor principal con sombra y bordes redondeados (UX) */}
      <div className="bg-white p-10 rounded-2xl shadow-xl text-center max-w-2xl">
        
        <h1 className="text-5xl font-extrabold text-brand-purple mb-4">
          Hola, soy Saraí
        </h1>
        
        <p className="text-xl text-gray-600 font-medium">
          Ingeniera en Ciencias de la Computación & <span className="text-brand-green">UX Designer</span>
        </p>

        <div className="mt-8 flex gap-4 justify-center">
          <button className="px-6 py-3 bg-brand-purple text-white rounded-full font-bold hover:bg-purple-700 transition-all shadow-lg hover:shadow-purple-200">
            Ver mi Portafolio
          </button>
          
          <button className="px-6 py-3 border-2 border-brand-green text-brand-green rounded-full font-bold hover:bg-brand-green hover:text-white transition-all">
            Leer Blog
          </button>
        </div>

      </div>
      
      <p className="mt-6 text-gray-400 text-sm">
        Construyendo mi marca personal con React + Tailwind
      </p>
    </div>
  )
}

export default App