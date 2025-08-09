import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { BlogPost } from "../types/types";
import { toast } from "react-toastify";
import { getAllBlogPosts } from "../api/blog";
import BlogCardMain from "./BlogCardMain";


const BlogPosts = () => {

    const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const navigate = useNavigate();

    //Buscar notas de blog
    useEffect(() => {
        const getBlogPosts = async () => {
            try {
                setLoading(true);
                const response = await getAllBlogPosts();
                if (response.status === 'success' && response.blogPosts) {
                    setBlogPosts(response.blogPosts);
                } else {
                    toast.error('Hubo un problema al obtener las notas', { theme: "colored" });
                    setError('No se pudieron obtener las notas');
                }
            } catch (error) {
                console.error(error);
                setError(error as string);
                toast.error('Error al obtener las notas', { theme: "colored" });
            } finally {
                setLoading(false);
            }
        };
        getBlogPosts();
    }, []);


    if (loading) return <div>Cargado...</div>

    if (error) return <div>{error}</div>
    return (

        <>
            <div className="max-w-7xl mx-auto space-y-10">
                <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                    Últimos Notas
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {blogPosts.length > 0
                        ? blogPosts.map(post => <BlogCardMain key={post._id} post={post} />)
                        : "No hay notas de blog para mostrar."
                    }
                </div>
            </div>
        </>
    )
}

export default BlogPosts