import { useState } from 'react'; // IMPORTANTE: Agregado useState
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import AboutMe from './pages/AboutMe';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import Footer from './components/Footer';
import fotoReal from './assets/Saraí_3.jpg';
import fotoPixel from './assets/Sarai.jpg';

// Movimos Home a un componente con estado para manejar el toque en móvil
const Home = () => {
  const [isDigital, setIsDigital] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }} // Cambiado a 0 para efecto de subida
      transition={{ duration: 0.8 }}
    >
      <div className="min-h-[90vh] flex flex-col items-center justify-center px-4 relative">
        <div className="max-w-4xl w-full grid md:grid-cols-2 gap-12 items-center relative z-10">
          
          {/* Columna Izquierda: Mensaje de Bienvenida */}
          <div className="text-center md:text-left order-2 md:order-1">
            <span className="bg-brand-purple/10 text-brand-purple px-4 py-1 rounded-full text-sm font-bold tracking-wide uppercase">
              Bienvenidos a mi espacio
            </span>
            <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mt-4 leading-tight">
              Hola, soy <span className="text-brand-purple">Saraí</span>
            </h1>
            <p className="text-xl text-gray-600 mt-6 leading-relaxed">
              "Creo soluciones tecnológicas con <span className="font-semibold text-brand-green">empatía</span>, diseño y un toque de magia funcional."
            </p>
            <div className="mt-10 flex flex-wrap gap-4 justify-center md:justify-start">
              <Link to="/sobre-mi">
                <button className="px-8 py-4 bg-brand-purple text-white rounded-2xl font-bold shadow-lg shadow-purple-200 hover:-translate-y-1 transition-all">
                  Explora mi visión
                </button>
              </Link>
            </div>
          </div>

          {/* Columna Derecha: Foto con efecto Tap/Hover */}
          <div className="order-1 md:order-2 flex justify-center">
            <div 
              className="relative group cursor-pointer"
              onClick={() => setIsDigital(!isDigital)}
            >
              {/* Aura de fondo */}
              <div className="absolute -inset-6 bg-gradient-to-tr from-brand-purple/10 via-brand-blue/5 to-brand-green/10 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-700"></div>
              
              {/* Contenedor de las fotos */}
              <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white shadow-[0_20px_50px_rgba(0,0,0,0.1)] md:group-hover:shadow-purple-200/50 md:group-hover:-translate-y-2 transition-all duration-500 ease-out">
                {/* Foto Real */}
                <img 
                  src={fotoReal} 
                  alt="Saraí Real" 
                  className={`absolute inset-0 w-full h-full object-cover z-10 transition-opacity duration-700 ease-in-out 
                    ${isDigital ? 'opacity-0' : 'opacity-100'} md:group-hover:opacity-0`}
                />

                {/* Foto Pixel Art */}
                <img 
                  src={fotoPixel} 
                  alt="Saraí Pixel" 
                  className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out 
                    ${isDigital ? 'scale-100 opacity-100' : 'scale-110 opacity-0'} md:group-hover:scale-100 md:group-hover:opacity-100`}
                />
              </div>

              {/* Tooltip */}
              <div className={`absolute -bottom-2 left-1/2 -translate-x-1/2 bg-brand-purple text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-lg transition-all duration-500 pointer-events-none
                ${isDigital ? 'opacity-100 bottom-2' : 'opacity-0 md:group-hover:opacity-100 md:group-hover:bottom-2'}`}>
                {isDigital ? '¡Modo Digital Activo! 👾' : '¡Versión Digital ✨!'}
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-brand-purple rotate-45"></div>
              </div>

              {/* Indicador táctil para móviles (solo se ve si no han tocado) */}
              {!isDigital && (
                <div className="md:hidden absolute -top-2 -right-2 bg-brand-green text-white w-8 h-8 rounded-full flex items-center justify-center animate-bounce shadow-md">
                  <span className="text-xs">👆</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-50 relative overflow-hidden">
        {/* Sprites decorativos de fondo (Globales) */}
        <div className="absolute top-[-10%] left-[-10%] w-72 h-72 bg-brand-purple/10 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-brand-green/10 rounded-full blur-3xl animate-blob" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-[40%] right-[20%] w-64 h-64 bg-brand-blue/5 rounded-full blur-3xl animate-blob" style={{ animationDelay: '4s' }}></div>
        
        <Navbar />

        <main className="relative z-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sobre-mi" element={<AboutMe />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/portafolio" element={<div className="p-10 text-center text-xl">Próximamente</div>} />
            <Route path="/contacto" element={<Contact />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;