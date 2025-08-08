import type { BlogPost } from "../types/types"
import { formatDate } from "../utils/utils"
import catEdu from '../assets/gatosescuela.png';
import catSal from '../assets/gatosalud.png';
import catVid from '../assets/gatosvideos.png';
import catEve from '../assets/gatosevento.png';
import catNot from '../assets/gatonoticias.png';


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
    let catImg = '';

    if (post.typeOfBlogPost === 'noticia') {
        cardBorderClass = 'border-blue-500';
        cardBodyBgClass = 'bg-blue-100';
        typeTagBgClass = 'bg-blue-500';
        typeTagTextColor = 'text-white';
        catImg = catNot;
    } else if (post.typeOfBlogPost === 'evento') {
        cardBorderClass = 'border-pink-500';
        cardBodyBgClass = 'bg-pink-100';
        typeTagBgClass = 'bg-pink-500';
        typeTagTextColor = 'text-white';
        catImg = catEve;
    } else if (post.typeOfBlogPost === 'salud') {
        cardBorderClass = 'border-green-500';
        cardBodyBgClass = 'bg-green-100';
        typeTagBgClass = 'bg-green-500';
        typeTagTextColor = 'text-white';
        catImg = catSal;
    } else if (post.typeOfBlogPost === 'video' || post.typeOfBlogPost === 'educación') {
        cardBorderClass = 'border-purple-500';
        cardBodyBgClass = 'bg-purple-100';
        typeTagBgClass = 'bg-purple-500';
        typeTagTextColor = 'text-white';
        catImg = catVid
    }



    return (
        <div className={`flex rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border-t-4 ${cardBorderClass}`}>
            <img className="w-48 h-full object-cover" src={catImg} alt="img" />
            <div className="p-6 flex flex-col justify-between">
                <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-1 leading-tight">{post.title}</h3>
                    <p className="text-gray-500 text-sm mt-0.5">Creado: {formatDate(post.createdAt)}</p>
                    <span className={`inline-block text-xs font-semibold rounded-full px-2 py-0.5 mt-2 ${typeTagBgClass} ${typeTagTextColor}`}>
                        {post.typeOfBlogPost}
                    </span>
                </div>
                <div className="border-t border-purple-200 pt-4 flex  justify-center">
                    <Link to={"/"} className="inline-flex items-center text-orange-600 hover:underline font-semibold text-sm">
                        Leer →
                    </Link>
                </div>
            </div>
        </div >
    )
}

export default BlogCardMain