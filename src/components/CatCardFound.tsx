
import type { CatPost } from '../types/types'

interface CatCardFoundProps {
    post: CatPost
}

const CatCardFound = ({post}:CatCardFoundProps) => {
    return (
        <div className="rounded-lg shadow-md overflow-hidden bg-yellow-50 border-t-4 border-yellow-400 transform hover:scale-105 transition duration-300">
            <img className="w-full h-48 object-cover" src={post.photoUrl} alt={`Michi encontrado: ${post.catName}`} />
            <div className="p-4">
                <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-yellow-400 text-gray-800 mb-2">
                    Encontrado
                </span>
                <h3 className="text-xl font-bold text-gray-800 mb-1 line-clamp-1">
                    {post.catName}
                </h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                    {post.description}
                </p>
                <div className="grid grid-cols-2 gap-2 text-sm text-gray-700 mb-3">
                    <div><strong className="font-semibold">Género:</strong> {post.gender}</div>
                    <div><strong className="font-semibold">Edad:</strong> {post.age}</div>
                    <div><strong className="font-semibold">Ubicación:</strong> {post.location.city}, {post.location.province}</div>
                </div>
                <div className="text-right">
                    <a href="#" className="inline-flex items-center text-orange-600 hover:underline font-semibold text-sm">
                        Ver Detalles &rarr;
                    </a>
                </div>
            </div>
        </div>
    )
}

export default CatCardFound