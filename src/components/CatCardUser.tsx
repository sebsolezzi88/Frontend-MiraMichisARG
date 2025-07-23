import type { CatPost } from "../types/types"


interface CatCardUserProps{
    catPost:CatPost
}

const CatCardUser = ({catPost}:CatCardUserProps) => {
    return (
        <div className="rounded-lg shadow-md overflow-hidden bg-emerald-50 border-t-4 border-emerald-400">
            <img className="w-full h-48 object-cover" src="img/1.jpg" alt="Michi en adopción: Mittens" />
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
                    {catPost.catName}
                </h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                    {catPost.description}
                </p>

                <div className="grid grid-cols-2 gap-2 text-sm text-gray-700 mb-3">
                    <div><strong className="font-semibold">Género:</strong> {catPost.gender}</div>
                    <div><strong className="font-semibold">Edad:</strong> {catPost.age}</div>
                    <div><strong className="font-semibold">Raza:</strong> {catPost.breed}</div>
                    <div><strong className="font-semibold">Ubicación:</strong> {catPost.location.city}, {catPost.location.province}</div>
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
    )
}

export default CatCardUser