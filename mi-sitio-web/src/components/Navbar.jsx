import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Flower, Menu, X } from 'lucide-react'
import fotoPixel from '../assets/Sarai.jpg'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Función para definir los estilos del link activo (Desktop)
  const navStyles = ({ isActive }) => 
    `transition-all duration-300 pb-1 border-b-2 font-medium ${
      isActive 
        ? 'text-brand-blue border-brand-blue scale-105' 
        : 'text-gray-600 border-transparent hover:text-brand-purple'
    }`;

  // Función para estilos en móvil
  const mobileNavStyles = ({ isActive }) =>
    `transition-all duration-300 block py-2 px-4 rounded-lg ${
      isActive 
        ? 'text-brand-blue bg-brand-blue/10 font-bold border-l-4 border-brand-blue' 
        : 'text-gray-700 hover:text-brand-purple hover:bg-gray-50'
    }`;

  return (
    <nav className="bg-white/90 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
      
        {/* Logo / Nombre Artístico */}
        <Link to="/" className="flex items-center gap-3 group" onClick={() => setIsOpen(false)}>
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-brand-purple group-hover:scale-110 transition-transform">
            <img src={fotoPixel} alt="SarAvi Logo" className="w-full h-full object-cover" />
          </div>
          <span className="text-2xl font-bold text-brand-purple">
            Sar<span className="text-brand-green">Avi</span>
          </span>
        </Link>

        {/* Enlaces (Desktop) */}
        <div className="hidden md:flex gap-8 items-center">
          <NavLink to="/" className={navStyles}>Home</NavLink>
          <NavLink to="/sobre-mi" className={navStyles}>Sobre Mí</NavLink>
          <NavLink to="/blog" className={navStyles}>Blog</NavLink>
          <NavLink to="/portafolio" className="hover:text-brand-purple transition-colors text-gray-400">Portafolio</NavLink>
          <NavLink to="/contacto" className={navStyles}>Contacto</NavLink>
        </div>

        {/* Mobile Button (Flor) */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-brand-purple hover:bg-purple-50 rounded-full transition-all">
          {isOpen ? <X size={30} /> : <Flower size={32} strokeWidth={1.5} className="animate-spin-slow" />}
        </button>
     </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-white border-b border-gray-100 shadow-xl animate-in slide-in-from-top duration-300">
          <div className="flex flex-col p-6 gap-6 font-semibold text-lg">
            <NavLink to="/" onClick={() => setIsOpen(false)} className={mobileNavStyles}>Home</NavLink>
            <NavLink to="/sobre-mi" onClick={() => setIsOpen(false)} className={mobileNavStyles}>Sobre Mí</NavLink>
            <NavLink to="/blog" onClick={() => setIsOpen(false)} className={mobileNavStyles}>Blog</NavLink>
            <NavLink to="/portafolio" onClick={() => setIsOpen(false)} className={mobileNavStyles}>Portafolio</NavLink>
            <NavLink to="/contacto" onClick={() => setIsOpen(false)} className={mobileNavStyles}>Contacto</NavLink> 
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;