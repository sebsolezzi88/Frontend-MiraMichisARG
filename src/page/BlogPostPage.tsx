import { useEffect, useState } from "react";
import type { BlogPost } from "../types/types";
import { useNavigate, useParams } from "react-router-dom";
import { getBlogPostById } from "../api/blog";
import { toast } from "react-toastify";
import { formatDate } from "../utils/utils";


const BlogPostPage = () => {

    const [blogPost, setBlogPost] = useState<BlogPost | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const navigate = useNavigate();

    const params = useParams();

    // Lógica para obtener el color de la etiqueta
    const getTagClasses = (typeOfPost: string | undefined) => {
        switch (typeOfPost) {
            case 'noticia':
                return 'bg-blue-100 text-blue-800';
            case 'evento':
                return 'bg-pink-100 text-pink-800';
            case 'salud':
                return 'bg-green-100 text-green-800';
            case 'video':
            case 'educación':
                return 'bg-purple-100 text-purple-800';
            default:
                return 'bg-gray-200 text-gray-800';
        }
    };


    //Buscar notas de blog
    useEffect(() => {

        //Si no hay un id redireccionamos
        if (!params.id) {
            navigate('/blog');
            return;
        }
        const getBlogPost = async () => {
            try {
                setLoading(true);
                const response = await getBlogPostById(params.id!);
                if (response.status === 'success' && response.blogPost) {
                    setBlogPost(response.blogPost);
                } else {
                    toast.error('Hubo un problema al obtener el post', { theme: "colored" });
                    setError('No se pudo obtener el post');
                }
            } catch (error) {
                console.error(error);
                setError(error as string);
                toast.error('Error al obtener el post', { theme: "colored" });
            } finally {
                setLoading(false);
            }
        };
        getBlogPost();
    }, [navigate, params.id]); // Agregamos dependencias para evitar warnings

    if (loading) return <div className="text-center mt-10">Cargando...</div>;

    if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;

    return (
        <div className="px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8 sm:px-8 space-y-6 mt-10">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <h1 className="text-4xl font-extrabold text-gray-800 leading-tight mb-2 sm:mb-0">
                    {blogPost?.title}
                </h1>
                {blogPost?.typeOfBlogPost && (
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold max-w-[150px] truncate text-center ${getTagClasses(blogPost.typeOfBlogPost)}`}>
                        {blogPost.typeOfBlogPost}
                    </span>
                )}
            </div>

            {blogPost?.createdAt && (
                <p className="text-gray-500 text-sm">
                    Creado el <span className="block font-semibold">{formatDate(blogPost.createdAt)}</span>
                </p>
            )}

            <hr className="my-6 border-gray-200" />

            <p className="text-lg text-gray-700 leading-relaxed">
                {blogPost?.text}
            </p>

            {blogPost?.link && (
                <div className="pt-4">
                    <a
                        className="inline-flex items-center text-orange-500 hover:text-orange-600 font-bold hover:underline transition"
                        href={blogPost.link}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Visitar enlace
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                        </svg>
                    </a>
                </div>
            )}
        </div>
    </div>
);
    
}

export default BlogPostPage;