import type { BlogPost } from "../types/types"
import { formatDate } from "../utils/utils"

interface BlogCardProps {
    post: BlogPost
}
const BlogCard = ({post}:BlogCardProps) => {
    return (
        <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-200">

            <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-2 leading-tight">{post.title}</h3>

                <p className="text-gray-500 text-sm mt-1">Creado: {post.date}</p>

                <span className="inline-block bg-orange-100 text-orange-700 text-xs font-semibold rounded-full px-3 py-1 mt-4">
                    Video
                </span>
            </div>


            <div className="bg-gray-50 border-t border-gray-200 px-6 py-4 flex justify-end items-center space-x-3">
                <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors duration-200">
                    Ver
                </a>
                <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200">
                    Editar
                </button>
                <button className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors duration-200">
                    Eliminar
                </button>
            </div>
        </div>

    )
}

export default BlogCard