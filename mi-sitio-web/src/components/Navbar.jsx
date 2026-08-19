import { Link } from 'react-router-dom';

const Navbar = () => {
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
          <Link to="/sobre-mi" className="hover:text-brand-purple transition-colors">Sobre Mí</Link>
          <Link to="/blog" className="hover:text-brand-purple transition-colors">Blog</Link>
          <Link to="/portafolio" className="hover:text-brand-purple transition-colors text-gray-400">Portafolio</Link>
          <Link to="/contacto" className="hover:text-brand-purple transition-colors text-gray-400">Contacto</Link>
        </div>
      </div>
    </nav>
    )
}

export default Navbar