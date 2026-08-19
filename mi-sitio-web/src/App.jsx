import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';

// Placeholder de las páginas
const Home = () => (
  <div className="min-h-[90vh] flex flex-col items-center justify-center px-4">
    <div className="max-w-4xl w-full grid md:grid-cols-2 gap-12 items-center">
      
      {/* Columna Izquierda: Mensaje de Bienvenida */}
      <div className="text-center md:text-left order-2 md:order-1">
        <span className="bg-brand-purple/10 text-brand-purple px-4 py-1 rounded-full text-sm font-bold tracking-wide">
          BIENVENIDOS A MI ESPACIO
        </span>
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mt-4 leading-tight">
          Hola, soy <span className="text-brand-purple">Saraí</span>
        </h1>
        <p className="text-xl text-gray-600 mt-6 leading-relaxed">
          "Creando soluciones tecnológicas con <span className="font-semibold text-brand-green">empatía</span>, diseño y un toque de magia funcional."
        </p>
        <div className="mt-10 flex flex-wrap gap-4 justify-center md:justify-start">
          <button className="px-8 py-4 bg-brand-purple text-white rounded-2xl font-bold shadow-lg shadow-purple-200 hover:-translate-y-1 transition-all">
            Conóceme más
          </button>
        </div>
      </div>

      {/* Columna Derecha: Foto */}
      <div className="order-1 md:order-2 flex justify-center">
        <div className="relative">
          {/* Círculo decorativo de fondo */}
          <div className="absolute -inset-4 bg-gradient-to-tr from-brand-purple/20 to-brand-green/20 rounded-full blur-2xl animate-pulse"></div>
          
          <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-8 border-white shadow-2xl">
            <img 
              src="/Sarai.png" 
              alt="Saraí Avilés" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
      
    </div>
  </div>
);

const About = () => <div className="p-10 text-center text-2xl">Sección Sobre Mí (En construcción)</div>;
const Blog = () => <div className="p-10 text-center text-2xl">Sección Blog (En construcción)</div>;

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sobre-mi" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          {/* Portafolio y contacto estarán visibles pero vacíos por ahora */}
          <Route path="/portafolio" element={<div className="p-10">Próximamente</div>} />
          <Route path="/contacto" element={<div className="p-10">Próximamente</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;