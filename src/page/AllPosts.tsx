import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import type { CatPost } from "../types/types";

const AllPosts = () => {

    const [catPosts, setCatPosts] = useState<CatPost[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

  
    useEffect(() => {
        const getCatPots = async () => {
            try {
                setLoading(true);
                return
                //const response = await getAllAdoptionCatPosts();
                if (response.status === 'success' && response.posts) {
                    
                } else {
                    toast.error('Hubo un problema al obtener Post de adopción', { theme: "colored", autoClose: 3000 });
                    setError('No se pudieron obtener los Post de adopción');
                }
            } catch (error) {
                console.log(error);
                setError(error as string);
                toast.error('Error al obtener los catpost', { theme: "colored", autoClose: 3000 });
            } finally {
                setLoading(false);
            }
        }
        getCatPots();
    }, [])

    if (loading) return <div>Cargado...</div>

    if (error) return <div>{error}</div>

    return (
        <div>Adoption</div>
    )
}

export default AllPosts