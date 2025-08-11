import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import type { Message } from "../types/types";
import { getReceivedMessages } from "../api/message";

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isCatsMenuOpen, setIsCatsMenuOpen] = useState(false); // Nuevo estado para el menú "Gatos"
    const [unreadMessages, setUnreadMessages] = useState<number>(0); // Estado de los mensajes sin leer

    const location = useLocation();
    const navigate = useNavigate();

    const { isAuthenticated, logout } = useAuth();

    /* useEffect para consultar si hay mensajes */
     useEffect(() => {
        if (!isAuthenticated) return; // Si no está logueado, no hace la llamada

        const fetchUnreadMessages = async () => {
            try {
                const response = await getReceivedMessages(); // Llamamos a la api
                console.log(response)
                if(response.status === 'success' && response.receivedMessages){}
                setUnreadMessages(response.receivedMessages.filter(msg => msg.read === false).length); //Buscamos los mensajes no leidos
            } catch (error) {
                console.error("Error al obtener mensajes no leídos:", error);
            }
        };
        
        // Ejecuta la primera vez y luego cada 30 segundos
        fetchUnreadMessages();
        const intervalId = setInterval(fetchUnreadMessages, 30000); 

        // Limpia el intervalo cuando el componente se desmonta
        return () => clearInterval(intervalId);
    }, [isAuthenticated]);

    const handleLogoutClick = () => {
        logout();
        closeMobileMenu();
        toast.success('Haz cerrado sesión', { theme: "colored", autoClose: 3000 });
        navigate('/login');
    };

    // Función auxiliar para determinar si un enlace está activo
    const getLinkClasses = (path: string) => {
        const baseClasses = "font-medium hover:text-orange-500";
        const activeClasses = "text-orange-600";
        const inactiveClasses = "text-gray-700";
        return `${baseClasses} ${location.pathname === path ? activeClasses : inactiveClasses}`;
    };

    const getMobileLinkClasses = (path: string) => {
        const baseMobileClasses = "block px-4 py-2 rounded-md font-medium hover:bg-gray-50";
        const activeClasses = "text-orange-600";
        const inactiveClasses = "text-gray-700";
        return `${baseMobileClasses} ${location.pathname === path ? activeClasses : inactiveClasses}`;
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(prevState => !prevState);
        setIsCatsMenuOpen(false); // Cerrar el submenú si se abre el menú principal
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
        setIsCatsMenuOpen(false); // Cerrar submenú al cerrar menú principal
    };

    // Nueva función para alternar el menú desplegable de Gatos
    const toggleCatsMenu = () => {
        setIsCatsMenuOpen(prevState => !prevState);
    };

    return (
        <header className="bg-white shadow-sm p-4 rounded-lg mb-6 flex justify-between items-center relative z-10">
            <h1 className="text-xl font-bold text-orange-500 hover:text-orange-600"><Link to="/">MiraMichis ARG</Link></h1>

            {/* Menú para pantallas grandes (Desktop) */}
            <nav className="hidden md:block">
                <ul className="flex space-x-4 items-center">
                    <li><Link to="/" className={getLinkClasses('/')}>Inicio</Link></li>

                    {/* Botón para menú desplegable de Gatos */}
                    <li className="relative">
                        <button
                            onClick={toggleCatsMenu}
                            className={`font-medium hover:text-orange-500 flex items-center ${location.pathname.startsWith('/catpost') ? 'text-orange-600' : 'text-gray-700'}`}
                        >
                            Gatos
                            <svg className={`ml-1 h-4 w-4 transform transition-transform duration-200 ${isCatsMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                            </svg>
                        </button>
                        {/* Menú desplegable */}
                        {isCatsMenuOpen && (
                            <ul className="absolute top-full mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20">
                                <li>
                                    <Link to="/catpost/adopción" onClick={() => setIsCatsMenuOpen(false)} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                                        En Adopción
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/catpost/perdido" onClick={() => setIsCatsMenuOpen(false)} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                                        Perdidos
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/catpost/encontrado" onClick={() => setIsCatsMenuOpen(false)} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                                        Encontrados
                                    </Link>
                                </li>
                            </ul>
                        )}
                    </li>
                    <li><Link to="/blog" className={getLinkClasses('/blog')}>Blog</Link></li>


                    {isAuthenticated
                        ? <>
                            <li><Link to="/profile" className={getLinkClasses('/profile')}>Perfil</Link></li>
                            <Link to="/messages" className="relative font-medium text-gray-700 hover:text-orange-500">
                                {/* Icono de mensajes */}
                                Mensajes
                                {unreadMessages > 0 && (
                                    <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                        {unreadMessages}
                                    </span>
                                )}
                            </Link>
                            <li><button onClick={handleLogoutClick} className={getLinkClasses('/logout')}>Logout</button></li>
                        </>
                        : <>
                            <li><Link to="/login" className={getLinkClasses('/login')}>Login</Link></li>
                            <li><Link to="/register" className={getLinkClasses('/register')}>Registro</Link></li>
                        </>
                    }
                    <li><Link to="/contact" className={getLinkClasses('/contact')}>Contacto</Link></li>
                </ul>
            </nav>

            {/* Botón para abrir/cerrar el menú móvil */}
            <button
                className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-500"
                onClick={toggleMobileMenu}
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-menu-panel"
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
                    {/* Menú para móvil, aquí podríamos usar el mismo botón desplegable */}
                    <li className="relative">
                        <button
                            onClick={toggleCatsMenu}
                            className={`${getMobileLinkClasses(location.pathname.startsWith('/catpost') ? '/catpost' : '')} flex items-center justify-between w-full`}
                        >
                            Gatos
                            <svg className={`ml-1 h-4 w-4 transform transition-transform duration-200 ${isCatsMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                            </svg>
                        </button>
                        {isCatsMenuOpen && (
                            <ul className="pl-4 mt-1 space-y-1">
                                <li>
                                    <Link to="/catpost/adopción" onClick={closeMobileMenu} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                                        En Adopción
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/catpost/perdido" onClick={closeMobileMenu} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                                        Perdidos
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/catpost/encontrado" onClick={closeMobileMenu} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                                        Encontrados
                                    </Link>
                                </li>
                            </ul>
                        )}
                    </li>
                            <li><Link to="/blog" className={getMobileLinkClasses('/blog')} onClick={closeMobileMenu}>Blog</Link></li>

                    {isAuthenticated
                        ? <>
                            <li><Link to="/profile" className={getMobileLinkClasses('/profile')} onClick={closeMobileMenu}>Mi Perfil</Link></li>
                            <li><button onClick={handleLogoutClick} className={getMobileLinkClasses('/logout')}>Logout</button></li>
                        </>
                        : <>
                            <li><Link to="/login" className={getMobileLinkClasses('/login')} onClick={closeMobileMenu}>Login</Link></li>
                            <li><Link to="/register" className={getMobileLinkClasses('/register')} onClick={closeMobileMenu}>Registro</Link></li>
                        </>
                    }
                    <li><Link to="/contact" className={getMobileLinkClasses('/contact')} onClick={closeMobileMenu}>Contacto</Link></li>
                </ul>
            </div>
        </header>
    );
};

export default Navbar;