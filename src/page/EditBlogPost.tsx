import { useEffect, useState, type ChangeEvent, type FormEvent } from "react"
import type { BlogPostFormData } from "../types/types"
import { toast } from "react-toastify"
import { addBlogPost, getBlogPostById } from "../api/blog"
import { useNavigate, useSearchParams } from "react-router-dom"


const EditBlogPost = () => {

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const postId = searchParams.get('postId'); //Buscamos el parametros en la url

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState('');

    const [blogFormData, setBlogFormData] = useState<BlogPostFormData>({
        title: "",
        text: "",
        typeOfBlogPost: "",
        link: "",
    })

     useEffect(() => {
            if (!postId) {
                toast.error('Debe proporcionar un id', { theme: "colored", autoClose: 3000 });
                navigate('/profile');
            }
            //Si hay id buscamos el post
            const getBlogPost = async () => {
                try {
                    setLoading(true);
                    const response = await getBlogPostById(postId!);
                    if (response.status === 'success' && response.blogPost) {
                        
                        setBlogFormData({
                            title: response.blogPost.title!,
                            text: response.blogPost.text!,
                            typeOfBlogPost: response.blogPost.typeOfBlogPost!,
                            link: response.blogPost.link || ""

                        });
                        
                    } else {
                        setError(response.message || "Publicación no encontrada.");
                    }
                } catch (error) {
                    console.error("Error al cargar publicaciones:", error);
                    toast.error("Error al cargar la publicación para editar.", { theme: "colored" });
                    setError("No se pudieron cargar tus publicaciones.");
                } finally {
                    setLoading(false);
                }
            }
            getBlogPost();
    
        }, [])
    const handletChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setBlogFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }
    const handletSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (blogFormData.text.trim() === '' ||
            blogFormData.title.trim() === '' ||
            blogFormData.typeOfBlogPost.trim() === '') {
            toast.error('Título,contenido y tipo de Publicacion son obligatorios',
                { theme: "colored", autoClose: 3000 });
            return
        }
        //Guardar publicación
        try {
            const response = await addBlogPost(blogFormData);
            if(response.status === 'success' && response.blogPost){
                toast.success('Nota de blog creada',
                { theme: "colored", autoClose: 3000 });
                navigate('/profile');
            }
        } catch (error) {
            console.log(error);
            toast.error('Error inesperado al crear Nota de Blog',
                { theme: "colored", autoClose: 3000 });
        }
    }

    if (loading) {
        return <div className="text-center p-6 text-gray-700">Cargando tu publicación...</div>;
    }

    if (error) {
        return <div className="text-center p-6 text-red-600">Error: {error}</div>;
    }

    return (
        <div className="bg-amber-50 min-h-screen flex items-center justify-center p-4">

            <div className="max-w-2xl w-full bg-white rounded-xl shadow-lg p-8 space-y-6">
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold text-gray-800 mb-2">
                        Edita la publicación
                    </h2>
                    <p className="text-gray-600">
                        Solo para uso de administradores.
                    </p>
                </div>

                <form onSubmit={handletSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Título</label>
                        <input
                            onChange={handletChange}
                            value={blogFormData.title}
                            type="text"
                            id="title"
                            name="title"
                            placeholder="El título de tu publicación"
                            className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm
                           focus:ring-orange-500 focus:border-orange-500 sm:text-sm"

                        />
                    </div>

                    <div>
                        <label htmlFor="text" className="block text-sm font-medium text-gray-700 mb-1">Contenido de la Publicación</label>
                        <textarea
                            onChange={handletChange}
                            value={blogFormData.text}
                            id="text"
                            name="text"
                            rows={8}
                            placeholder="Escribe el contenido de tu publicación aquí..."
                            className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm
                           focus:ring-orange-500 focus:border-orange-500 sm:text-sm resize-y"
                            required
                        ></textarea>
                    </div>

                    <div>
                        <label htmlFor="typeOfBlogPost" className="block text-sm font-medium text-gray-700 mb-1">Tipo de Publicación</label>
                        <select
                            onChange={handletChange}
                            value={blogFormData.typeOfBlogPost}
                            id="typeOfBlogPost"
                            name="typeOfBlogPost"
                            className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm
                           focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                            required
                        >
                            <option value="">Selecciona el tipo</option>
                            <option value="noticia">Noticia</option>
                            <option value="evento">Evento</option>
                            <option value="salud">Salud</option>
                            <option value="educación">Educación</option>
                            <option value="video">Video</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="link" className="block text-sm font-medium text-gray-700 mb-1">Enlace Relacionado (Opcional)</label>
                        <input
                            onChange={handletChange}
                            value={blogFormData.link}
                            type="url"
                            id="link"
                            name="link"
                            placeholder="https://ejemplo.com/enlace-interesante"
                            className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm
                           focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                        />
                        <p className="mt-1 text-xs text-gray-500">Si tu publicación incluye un video o recurso externo.</p>
                    </div>

                    <input type="hidden" name="userId" value="ID_DEL_ADMIN_ACTUAL" />

                    <div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent
                           rounded-md shadow-sm text-sm font-medium text-white
                           bg-orange-500 hover:bg-orange-600 focus:outline-none
                           focus:ring-2 focus:ring-offset-2 focus:ring-orange-500
                           transition duration-300"
                        >
                            Editar
                        </button>
                    </div>
                </form>
            </div>
        </div>

    )
}

export default EditBlogPost