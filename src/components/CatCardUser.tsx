import type { CatPost } from "../types/types"
import { capitalize, formatDate } from "../utils/utils"


interface CatCardUserProps{
    catPost:CatPost
}


const CatCardUser = ({catPost}:CatCardUserProps) => {

    // --- Lógica para determinar los colores de la tarjeta y etiquetas ---
    let cardBgClass = '';
    let cardBorderClass = '';
    let typeTagBgClass = '';
    let textTagColor='';
    let statusTagBgClass='';


    if (catPost.typeOfPublication === 'adopción') {
        cardBgClass = 'bg-emerald-50';
        cardBorderClass = 'border-emerald-400';
        typeTagBgClass = 'bg-emerald-400';
        textTagColor = 'text-white'
    } else if (catPost.typeOfPublication === 'encontrado') {
        cardBgClass = 'bg-yellow-50'; 
        cardBorderClass = 'border-yellow-400';
        typeTagBgClass = 'bg-yellow-400';
        textTagColor = 'text-gray-800'
    } else if(catPost.typeOfPublication==='perdido') {
        
        cardBgClass = 'bg-rose-50';
        cardBorderClass = 'border-rose-400';
        typeTagBgClass = 'bg-gray-400';
        textTagColor = 'text-white'
    }

    if(catPost.publicationStatus === 'activo'){
        statusTagBgClass = 'bg-orange-500';
    }else{
        statusTagBgClass = 'bg-green-500';
    }

    return (
        <div className={`rounded-lg shadow-md overflow-hidden ${cardBgClass} border-t-4 ${cardBorderClass}`}>
            <img className="w-full h-48 object-cover" src={catPost.photoUrl} alt={`Michi: ${catPost.catName}`}  />
            <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                    <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${typeTagBgClass} ${textTagColor}`}>
                        {capitalize(catPost.typeOfPublication)}
                    </span>
                    <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${statusTagBgClass} text-white`}>
                        {capitalize(catPost.publicationStatus)}
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
                    Publicado: {formatDate(catPost.date)}
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