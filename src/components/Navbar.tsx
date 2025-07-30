import { useState } from "react";
import { Link, useLocation } from "react-router-dom";


const Navbar = () => {

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const location = useLocation();// pasar saber en que ruta nos encontramos

    // Función auxiliar para determinar si un enlace está activo
    const getLinkClasses = (path: string) => {
        // Compara el pathname actual con la ruta del enlace
        // Si coinciden, aplica 'text-orange-600', de lo contrario 'text-gray-700'
        const baseClasses = "font-medium hover:text-orange-500"; // Clases comunes
        const activeClasses = "text-orange-600"; // Color para la página activa
        const inactiveClasses = "text-gray-700"; // Color para la página inactiva

        return `${baseClasses} ${location.pathname === path ? activeClasses : inactiveClasses}`;
    };

    // Clase adicional para enlaces del menú móvil (si son block)
    const getMobileLinkClasses = (path: string) => {
        const baseMobileClasses = "block px-4 py-2 rounded-md font-medium hover:bg-gray-50";
        const activeClasses = "text-orange-600";
        const inactiveClasses = "text-gray-700";

        return `${baseMobileClasses} ${location.pathname === path ? activeClasses : inactiveClasses}`;
    };

    // Función para alternar el estado del menú
    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(prevState => !prevState); // Alterna true/false
    };

    //Función para cerrar el menú cuando se hace clic en un enlace (útil en SPAs)
    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    return (

        <header className="bg-white shadow-sm p-4 rounded-lg mb-6 flex justify-between items-center relative z-10">
            <h1 className="text-xl font-bold text-orange-800">MiraMichis ARG</h1>

            {/* Menú para pantallas grandes (Desktop) */}
            <nav className="hidden md:block">
                <ul className="flex space-x-4">
                    <li><Link to="/" className={getLinkClasses('/')}>Inicio</Link></li>
                    <li><Link to="/login" className={getLinkClasses('/login')}>Login</Link></li>
                    <li><Link to="/register" className={getLinkClasses('/register')}>Registro</Link></li>
                    <li><Link to="/profile" className={getLinkClasses('/profile')}>Perfil</Link></li>
                    <li><Link to="/contact" className={getLinkClasses('/contact')}>Contacto</Link></li>
                </ul>
            </nav>

            {/* Botón para abrir/cerrar el menú móvil */}
            <button
               
                className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-500"
                onClick={toggleMobileMenu} // Asignamos el handler de React
                aria-expanded={isMobileMenuOpen} // Mejora la accesibilidad
                aria-controls="mobile-menu-panel" // Mejora la accesibilidad
            >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
            </button>

            {/* Menú móvil */}
            <div
                
                id="mobile-menu-panel" 
                className={`mobile-menu absolute top-full left-0 w-full bg-white shadow-lg md:hidden rounded-b-lg ${isMobileMenuOpen ? 'open' : ''}`}
            >
                <ul className="flex flex-col p-4 space-y-2">
                    <li><Link to="/" className={getMobileLinkClasses('/')} onClick={closeMobileMenu}>Inicio</Link></li>
                    <li><Link to="/login" className={getMobileLinkClasses('/login')} onClick={closeMobileMenu}>Login</Link></li>
                    <li><Link to="/register" className={getMobileLinkClasses('/register')} onClick={closeMobileMenu}>Registro</Link></li>
                    <li><Link to="/profile" className={getMobileLinkClasses('/profile')}  onClick={closeMobileMenu}>Mi Perfil</Link></li>
                    <li><Link to="/contact" className={getMobileLinkClasses('/contact')}  onClick={closeMobileMenu}>Contacto</Link></li>
                </ul>
            </div>
        </header>
    )
}

export default Navbar