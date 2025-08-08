import type { BlogPost } from "../types/types"
import { formatDate } from "../utils/utils"

import { Link } from "react-router-dom"

interface BlogCardProps {
    post: BlogPost
}
const BlogCardMain = ({ post }: BlogCardProps) => {


    // --- Lógica para determinar los colores de la tarjeta y etiquetas ---
    //"noticia" | "evento" | "salud" | "educación" | "video" 
    let cardBorderClass = 'border-gray-200'; // Color de borde por defecto
    let typeTagBgClass = 'bg-orange-100'; // Color de etiqueta por defecto
    let typeTagTextColor = 'text-orange-700';
    let cardBodyBgClass = 'bg-gray-100';

    if (post.typeOfBlogPost === 'noticia') {
        cardBorderClass = 'border-blue-500';
        cardBodyBgClass = 'bg-blue-100';
        typeTagBgClass = 'bg-blue-500';
        typeTagTextColor = 'text-white';
    } else if (post.typeOfBlogPost === 'evento') {
        cardBorderClass = 'border-pink-500';
        cardBodyBgClass = 'bg-pink-100';
        typeTagBgClass = 'bg-pink-500';
        typeTagTextColor = 'text-white';
    } else if (post.typeOfBlogPost === 'salud') {
        cardBorderClass = 'border-green-500';
        cardBodyBgClass = 'bg-green-100';
        typeTagBgClass = 'bg-green-500';
        typeTagTextColor = 'text-white';
    } else if (post.typeOfBlogPost === 'video' || post.typeOfBlogPost === 'educación') {
        cardBorderClass = 'border-purple-500';
        cardBodyBgClass = 'bg-purple-100';
        typeTagBgClass = 'bg-purple-500';
        typeTagTextColor = 'text-white';
    }



    return (
        <div className={`${cardBodyBgClass} rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border-t-4 ${cardBorderClass}`}>

            <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-2 leading-tight">{post.title}</h3>

                <p className="text-gray-500 text-sm mt-1">Creadog: {formatDate(post.createdAt)}</p>

                <span className={`inline-block text-xs font-semibold rounded-full px-3 py-1 mt-4 ${typeTagBgClass} ${typeTagTextColor}`}>
                    {post.typeOfBlogPost}
                </span>
            </div>


            <div className="bg-gray-50 border-t border-purple-200 px-6 py-4 flex justify-end items-center space-x-3">
                <Link to={`/`} className="inline-flex items-center text-orange-600 hover:underline font-semibold text-sm">
                    Leer
                </Link>

            </div>

        </div>
    )
}

export default BlogCardMain