import { useState } from "react";
import type { CatPost } from "../types/types"
import { capitalize, formatDate } from "../utils/utils"
import ReactModal from "react-modal";


interface CatCardUserProps{
    catPost:CatPost
}


const CatCardUser = ({catPost}:CatCardUserProps) => {

    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

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

    const openConfirmModal = () => setIsConfirmModalOpen(true);
    const closeConfirmModal = () => setIsConfirmModalOpen(false);

    const handleConfirmDelete = () => {
        openConfirmModal();
        console.log('click')
        //onDelete(catPost._id); // Llama a la función onDelete pasada desde el componente padre
        //closeConfirmModal(); // Cierra el modal después de confirmar
    };

    
    
    return (
        <div key={catPost.id} className={`rounded-lg shadow-md overflow-hidden ${cardBgClass} border-t-4 ${cardBorderClass}`}>
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
                    <button onClick={handleConfirmDelete} className="block w-full text-center py-2 px-4 rounded-md bg-red-500 text-white font-semibold hover:bg-red-600 transition duration-300">
                        Eliminar
                    </button>
                </div>
            </div>
            <ReactModal
                isOpen={isConfirmModalOpen}
                onRequestClose={closeConfirmModal}
                contentLabel="Confirmar Eliminación"
                className="bg-white p-8 rounded shadow-lg max-w-lg mx-auto mt-20"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            >
                <h2 className="text-xl font-bold mb-4">Confirmar Eliminación</h2>
                <p className="mb-6">¿Estás seguro de que deseas eliminar la publicación de "{catPost.catName}"? Esta acción no se puede deshacer.</p>
                <div className="flex justify-end space-x-4">
                    <button
                        onClick={closeConfirmModal}
                        className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleConfirmDelete}
                        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                        Eliminar
                    </button>
                </div>
            </ReactModal>
        </div>
    )
}

export default CatCardUser