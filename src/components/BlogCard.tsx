import { useState } from "react"
import type { BlogPost } from "../types/types"
import { formatDate } from "../utils/utils"
import ReactModal from "react-modal"

interface BlogCardProps {
    post: BlogPost
    onDeleteBlogPost: (id: string) => void
}
const BlogCard = ({ post, onDeleteBlogPost }: BlogCardProps) => {

    //Estado del modal
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

    // --- Lógica para determinar los colores de la tarjeta y etiquetas ---
    //"noticia" | "evento" | "salud" | "educación" | "video" 
    let cardBorderClass = 'border-gray-200'; // Color de borde por defecto
    let typeTagBgClass = 'bg-orange-100'; // Color de etiqueta por defecto
    let typeTagTextColor = 'text-orange-700';

    if (post.typeOfBlogPost === 'noticia') {
        cardBorderClass = 'border-blue-500';
        typeTagBgClass = 'bg-blue-500';
        typeTagTextColor = 'text-white';
    } else if (post.typeOfBlogPost === 'evento') {
        cardBorderClass = 'border-pink-500';
        typeTagBgClass = 'bg-pink-500';
        typeTagTextColor = 'text-white';
    } else if (post.typeOfBlogPost === 'salud') {
        cardBorderClass = 'border-green-500';
        typeTagBgClass = 'bg-green-500';
        typeTagTextColor = 'text-white';
    } else if (post.typeOfBlogPost === 'video' || post.typeOfBlogPost === 'educación') {
        cardBorderClass = 'border-purple-500';
        typeTagBgClass = 'bg-purple-500';
        typeTagTextColor = 'text-white';
    }

    const openConfirmModal = () => setIsConfirmModalOpen(true);
    const closeConfirmModal = () => setIsConfirmModalOpen(false);

    const handleConfirmDelete = (id: string) => {
        openConfirmModal();
        onDeleteBlogPost(id); // Llama a la función onDeleteBlogPost pasada desde el componente padre
        closeConfirmModal(); // Cierra el modal después de confirmar
    };


    return (
        <div className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border-2 ${cardBorderClass}`}>

            <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-2 leading-tight">{post.title}</h3>

                <p className="text-gray-500 text-sm mt-1">Creado: {formatDate(post.createdAt)}</p>

                <span className={`inline-block text-xs font-semibold rounded-full px-3 py-1 mt-4 ${typeTagBgClass} ${typeTagTextColor}`}>
                    {post.typeOfBlogPost}
                </span>
            </div>


            <div className="bg-gray-50 border-t border-gray-200 px-6 py-4 flex justify-end items-center space-x-3">
                <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors duration-200">
                    Ver
                </a>
                <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200">
                    Editar
                </button>
                <button 
                onClick={openConfirmModal}
                className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors duration-200">
                    Eliminar
                </button>
            </div>
            <ReactModal
                isOpen={isConfirmModalOpen}
                onRequestClose={closeConfirmModal}
                contentLabel="Confirmar Eliminación"
                className="bg-white p-8 rounded shadow-lg max-w-lg mx-auto mt-20"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            >
                <h2 className="text-xl font-bold mb-4">Confirmar Eliminación</h2>
                <p className="mb-6">¿Estás seguro de que deseas eliminar la publicación de "{post.title}"? Esta acción no se puede deshacer.</p>
                <div className="flex justify-end space-x-4">
                    <button
                        onClick={closeConfirmModal}
                        className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={() => handleConfirmDelete(post._id)}
                        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                        Eliminar
                    </button>
                </div>
            </ReactModal>
        </div>
    )
}

export default BlogCard