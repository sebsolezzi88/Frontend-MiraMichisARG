

const Navbar = () => {
  return (
    <header className="bg-white shadow-sm p-4 rounded-lg mb-6 flex justify-between items-center relative z-10">
        <h1 className="text-xl font-bold text-gray-800">MichiLand</h1>
        
        <nav className="hidden md:block">
            <ul className="flex space-x-4">
                <li><a href="#" className="text-orange-600 hover:text-orange-500 font-medium">Inicio</a></li>
                <li><a href="#" className="text-gray-700 hover:text-gray-900 font-medium">Login</a></li>
                <li><a href="#" className="text-gray-700 hover:text-gray-900 font-medium">Registro</a></li>
                <li><a href="#" className="text-gray-700 hover:text-gray-900 font-medium">Mi Perfil</a></li>
                <li><a href="#" className="text-gray-700 hover:text-gray-900 font-medium">Contacto</a></li>
            </ul>
        </nav>

        <button id="mobile-menu-button" className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-500">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
        </button>

        <div id="mobile-menu" className="mobile-menu absolute top-full left-0 w-full bg-white shadow-lg md:hidden rounded-b-lg">
            <ul className="flex flex-col p-4 space-y-2">
                <li><a href="#" className="block px-4 py-2 text-orange-600 hover:bg-gray-50 rounded-md font-medium">Inicio</a></li>
                <li><a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-md font-medium">Login</a></li>
                <li><a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-md font-medium">Registro</a></li>
                <li><a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-md font-medium">Mi Perfil</a></li>
                <li><a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-md font-medium">Contacto</a></li>
            </ul>
        </div>
    </header>

  )
}

export default Navbar