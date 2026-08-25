import fotoPixel from '../assets/Sarai.png';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 py-12 mt-20">
      <div className="max-w-6xl mx-auto px-6 flex flex-col items-center text-center">
        
        {/* Avatar de firma */}
        <div className="w-16 h-16 rounded-full overflow-hidden mb-4 grayscale hover:grayscale-0 transition-all duration-500">
          <img src={fotoPixel} alt="Saraí Signature" className="w-full h-full object-cover" />
        </div>

        <h3 className="text-xl font-bold text-gray-900">Saraí Avilés</h3>
        <p className="text-gray-500 text-sm mt-2 max-w-xs">
          Ingeniera en Ciencias de la Computación & UX Designer en formación. 
          Construyendo tecnología con empatía.
        </p>

        {/* Links Rápidos */}
        <div className="flex gap-6 mt-6 text-gray-400 text-sm font-medium">
          <a href="https://github.com/SarAvi21805" target="_blank" className="hover:text-brand-purple transition-colors">GitHub</a>
          <a href="https://www.linkedin.com/in/alejandra-avil%C3%A9s-3886b5408/" className="hover:text-brand-purple transition-colors">LinkedIn</a>
          <a href="mailto:alejandraviles2005@gmail.com" className="hover:text-brand-purple transition-colors">Email</a>
        </div>

        <div className="mt-10 text-xs text-gray-300">
          © {new Date().getFullYear()} SarAvi — Hecho con React
        </div>
      </div>
    </footer>
  );
};

export default Footer;