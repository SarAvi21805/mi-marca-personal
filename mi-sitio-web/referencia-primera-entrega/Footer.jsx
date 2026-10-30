import { useState } from 'react';
import fotoPixel from '../assets/Sarai.jpg'; 

const Footer = () => {
  const [isColored, setIsColored] = useState(false);

  return (
    <footer className="bg-white border-t border-gray-100 py-12 mt-20">
      <div className="max-w-6xl mx-auto px-6 flex flex-col items-center text-center">
        
        {/* Avatar de firma con interacción de toque */}
        <div 
          onClick={() => setIsColored(!isColored)}
          className={`w-16 h-16 rounded-full overflow-hidden mb-4 transition-all duration-700 cursor-pointer
            ${isColored ? 'grayscale-0 scale-110 shadow-lg' : 'grayscale md:hover:grayscale-0 md:hover:scale-110'}`}
        >
          <img src={fotoPixel} alt="Saraí Signature" className="w-full h-full object-cover" />
        </div>

        <h3 className="text-xl font-bold text-gray-900 italic">Saraí Avilés</h3>
        <p className="text-gray-500 text-sm mt-2 max-w-xs">
          Ingeniera en Ciencias de la Computación & <span className="text-brand-purple">UX Designer</span> en formación. 
          Construyendo tecnología con empatía.
        </p>

        {/* Redes */}
        <div className="flex gap-6 mt-6 text-gray-400 text-sm font-medium">
          <a href="https://github.com/SarAvi21805" target="_blank" className="hover:text-brand-purple transition-colors">GitHub</a>
          <a href="https://linkedin.com" target="_blank" className="hover:text-brand-purple transition-colors">LinkedIn</a>
          <a href="mailto:tu-correo@uvg.edu.gt" className="hover:text-brand-purple transition-colors">Email</a>
        </div>

        <div className="mt-10 text-[10px] uppercase tracking-widest text-gray-300">
          © {new Date().getFullYear()} SarAvi — Hecho con React + ✨
        </div>
      </div>
    </footer>
  );
};

export default Footer;