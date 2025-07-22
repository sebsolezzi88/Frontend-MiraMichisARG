

const Profile = () => {
  return (
    <div className="bg-amber-50 min-h-screen p-6">

    <header className="bg-white shadow-sm p-4 rounded-lg mb-6 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">MichiLand</h1>
        <nav>
            <ul className="flex space-x-4">
                <li><a href="#" className="text-orange-600 hover:text-orange-500 font-medium">Inicio</a></li>
                <li><a href="#" className="text-gray-700 hover:text-gray-900 font-medium">Cerrar Sesión</a></li>
            </ul>
        </nav>
    </header>

    <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-lg p-8 space-y-8">
        <div className="text-center pb-4 border-b border-gray-200 relative">
            <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
                <img className="w-24 h-24 rounded-full border-4 border-white shadow-md object-cover" 
                     src="img/profile.jpg" 
                     alt="Avatar de usuario"/>
            </div>
            
            <h2 className="text-4xl font-extrabold text-gray-800 pt-12 mb-2">
                ¡Hola, NombreDeUsuario!
            </h2>
            <p className="text-lg text-gray-600">
                Administra tus publicaciones y tu perfil aquí.
            </p>
            
            <a href="#" className="inline-flex items-center mt-4 px-4 py-2 border border-transparent 
                               rounded-md shadow-sm text-sm font-medium text-white 
                               bg-blue-500 hover:bg-blue-600 focus:outline-none 
                               focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 
                               transition duration-300">
                Editar Perfil
            </a>
        </div>

        <nav className="flex flex-col md:flex-row md:justify-center md:space-x-4 
            border-b border-gray-200 pb-4 space-y-2 md:space-y-0">
    <a href="#" className="py-2 px-4 text-orange-600 border-b-2 border-orange-600 
                      font-semibold hover:text-orange-700 text-center">
        Todas mis Publicaciones
    </a>
    <a href="#" className="py-2 px-4 text-gray-600 border-b-2 border-transparent 
                      hover:border-gray-300 hover:text-gray-800 font-medium text-center">
        Michis en Adopción
    </a>
    <a href="#" className="py-2 px-4 text-gray-600 border-b-2 border-transparent 
                      hover:border-gray-300 hover:text-gray-800 font-medium text-center">
        Michis Encontrados
    </a>
    <a href="#" className="py-2 px-4 text-gray-600 border-b-2 border-transparent 
                      hover:border-gray-300 hover:text-gray-800 font-medium text-center">
        Michis Perdidos
    </a>
    <a href="#" className="py-2 px-4 bg-orange-500 text-white rounded-md font-semibold 
                      hover:bg-orange-600 transition duration-300 text-center">
        + Nueva Publicación
    </a>
</nav>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="rounded-lg shadow-md overflow-hidden bg-emerald-50 border-t-4 border-emerald-400">
                <img className="w-full h-48 object-cover" src="img/1.jpg" alt="Michi en adopción: Mittens"/>
                <div className="p-4">
                    <div className="flex justify-between items-center mb-2">
                        <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-emerald-400 text-white">
                            En Adopción
                        </span>
                        <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-blue-500 text-white">
                            Activa
                        </span>
                    </div>

                    <h3 className="text-xl font-bold text-gray-800 mb-1">
                        Mittens
                    </h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                        Mittens es una gata juguetona y cariñosa de 2 años. Le encanta perseguir láseres y tomar siestas al sol. Busca un hogar lleno de amor.
                    </p>

                    <div className="grid grid-cols-2 gap-2 text-sm text-gray-700 mb-3">
                        <div><strong className="font-semibold">Género:</strong> Macho</div>
                        <div><strong className="font-semibold">Edad:</strong> 3 meses</div>
                        <div><strong className="font-semibold">Raza:</strong> Siames</div>
                        <div><strong className="font-semibold">Ubicación:</strong> San Nicolás, BA</div>
                    </div>
                    <div className="text-xs text-gray-500 text-right mb-4">
                        Publicado: 17/07/2025
                    </div>

                    <div className="flex flex-col space-y-2">
                        <a href="#" className="block w-full text-center py-2 px-4 rounded-md bg-blue-500 text-white font-semibold hover:bg-blue-600 transition duration-300">
                            Editar Publicación
                        </a>
                        <button className="block w-full text-center py-2 px-4 rounded-md bg-gray-200 text-gray-800 font-semibold hover:bg-gray-300 transition duration-300">
                            Marcar como Finalizada
                        </button>
                        <button className="block w-full text-center py-2 px-4 rounded-md bg-red-500 text-white font-semibold hover:bg-red-600 transition duration-300">
                            Eliminar
                        </button>
                    </div>
                </div>
            </div>

            <div className="rounded-lg shadow-md overflow-hidden bg-rose-50 border-t-4 border-rose-400">
                <img className="w-full h-48 object-cover" src="img/2.jpg" alt="Michi perdido: Luna"/>
                <div className="p-4">
                    <div className="flex justify-between items-center mb-2">
                        <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-rose-400 text-white">
                            Perdido
                        </span>
                        <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-orange-500 text-white">
                            Activa
                        </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-1">
                        Luna
                    </h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                        Luna se perdió cerca del parque el 15 de julio. Es de color gris, con ojos verdes y tiene un collar rosa. ¡La extrañamos mucho!
                    </p>
                    <div className="grid grid-cols-2 gap-2 text-sm text-gray-700 mb-3">
                        <div><strong className="font-semibold">Género:</strong> Hembra</div>
                        <div><strong className="font-semibold">Edad:</strong> 1 año</div>
                        <div><strong className="font-semibold">Ubicación:</strong> Centro, San Nicolás</div>
                    </div>
                    <div className="text-xs text-gray-500 text-right mb-4">
                        Publicado: 16/07/2025
                    </div>
                    <div className="flex flex-col space-y-2">
                        <a href="#" className="block w-full text-center py-2 px-4 rounded-md bg-blue-500 text-white font-semibold hover:bg-blue-600 transition duration-300">
                            Editar Publicación
                        </a>
                        <button className="block w-full text-center py-2 px-4 rounded-md bg-gray-200 text-gray-800 font-semibold hover:bg-gray-300 transition duration-300">
                            Marcar como Finalizada
                        </button>
                        <button className="block w-full text-center py-2 px-4 rounded-md bg-red-500 text-white font-semibold hover:bg-red-600 transition duration-300">
                            Eliminar
                        </button>
                    </div>
                </div>
            </div>

            <div className="rounded-lg shadow-md overflow-hidden bg-yellow-50 border-t-4 border-yellow-400 opacity-60">
                <img className="w-full h-48 object-cover" src="img/3.jpg" alt="Michi encontrado: Sin Nombre"/>
                <div className="p-4">
                    <div className="flex justify-between items-center mb-2">
                        <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-yellow-400 text-gray-800">
                            Encontrado
                        </span>
                        <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-green-500 text-white">
                            Finalizada
                        </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-1">
                        Sin Nombre
                    </h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                        Michi amistoso encontrado en la Plaza Mitre. Parece un gato doméstico y está bien cuidado. ¡Ya se reunió con su familia!
                    </p>
                    <div className="grid grid-cols-2 gap-2 text-sm text-gray-700 mb-3">
                        <div><strong className="font-semibold">Género:</strong> Desconocido</div>
                        <div><strong className="font-semibold">Edad:</strong> Adulto</div>
                        <div><strong className="font-semibold">Ubicación:</strong> Plaza Mitre, San Nicolás</div>
                    </div>
                    <div className="text-xs text-gray-500 text-right mb-4">
                        Publicado: 18/07/2025
                    </div>
                    <div className="flex flex-col space-y-2">
                        <span className="block w-full text-center py-2 px-4 rounded-md bg-gray-100 text-gray-500 font-semibold cursor-not-allowed">
                            Publicación Finalizada
                        </span>
                        <button className="block w-full text-center py-2 px-4 rounded-md bg-red-500 text-white font-semibold hover:bg-red-600 transition duration-300">
                            Eliminar
                        </button>
                    </div>
                </div>
            </div>
            
            </div>
    </div>

</div>
  )
}

export default Profile