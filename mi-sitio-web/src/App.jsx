import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';

// Placeholder de las páginas
const Home = () => (
  <div className="min-h-[80vh] flex flex-col items-center justify-center p-4">
    <div className="bg-white p-10 rounded-3xl shadow-xl text-center max-w-2xl border border-gray-50">
      <h1 className="text-5xl font-extrabold text-brand-purple mb-4">Hola, soy Saraí</h1>
      <p className="text-xl text-gray-600">Creando soluciones con empatía y tecnología.</p>
      {/* FOTO */}
      <div className="mt-6 w-32 h-32 bg-gray-200 rounded-full mx-auto overflow-hidden border-4 border-brand-green">
         {/* <img src="/tu-foto.jpg" alt="Saraí" /> */}
         <img src="/Sarai.png" alt="Saraí" />
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