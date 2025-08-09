import { useEffect, useState } from "react";
import type { BlogPost } from "../types/types";
import { useNavigate } from "react-router-dom";
import { getBlogPostById } from "../api/blog";
import { toast } from "react-toastify";


const BlogPostPage = () => {

    const [blogPost, setBlogPost] = useState<BlogPost | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const navigate = useNavigate();

    //Buscar notas de blog
    useEffect(() => {
        const getBlogPost = async () => {
            try {
                setLoading(true);
                const response = await getBlogPostById('fd');
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
    }, []);

    if (loading) return <div>Cargado...</div>

    if (error) return <div>{error}</div>

  return (
    <div>
        <h1>Blogpost</h1>
    </div>
  )
}

export default BlogPostPage