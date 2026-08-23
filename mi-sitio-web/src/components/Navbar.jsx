import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Flower, Menu, X } from 'lucide-react'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
      
        {/* Logo / Nombre Artístico */}
        <Link to="/" className="text-2xl font-bold text-brand-purple">
          Sar<span className="text-brand-green">Avi</span>
        </Link>

        {/* Enlaces (Desktop) */}
        <div className="hidden md:flex gap-8 font-medium text-gray-600">
          <Link to="/" className="hover:text-brand-purple transition-colors">Home</Link>
          <Link to="/sobre-mi" className="hover:text-brand-purple transition-colors">Sobre mí</Link>
          <Link to="/blog" className="hover:text-brand-purple transition-colors">Blog</Link>
          <Link to="/portafolio" className="hover:text-brand-purple transition-colors text-gray-400">Portafolio</Link>
          <Link to="/contacto" className="hover:text-brand-purple transition-colors">Contacto</Link>
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
          <div className="flex flex-col p-6 gap-6 font-semibold text-lg text-gray-700">
            <Link to="/" onClick={() => setIsOpen(false)} className="hover:text-brand-purple">Home</Link>
            <Link to="/sobre-mi" onClick={() => setIsOpen(false)} className="hover:text-brand-purple">Sobre Mí</Link>
            <Link to="/blog" onClick={() => setIsOpen(false)} className="hover:text-brand-purple">Blog</Link>
            <hr className="border-gray-100" />
            <div className="flex gap-4 text-sm text-gray-400">
              <span>Portafolio (Próximamente)</span>
            </div>
            <Link to="/contacto" onClick={() => setIsOpen(false)} className="hover:text-brand-purple">Contacto</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;