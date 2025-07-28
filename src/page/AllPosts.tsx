import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import type { CatPost, TypeOfPublication } from "../types/types";
import { useNavigate, useParams } from "react-router-dom";
import { getAllCatPostsByType } from "../api/catPost";

const AllPosts = () => {

    const [catPosts, setCatPosts] = useState<CatPost[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const navigate = useNavigate();

    const {type} = useParams<{ type: TypeOfPublication }>() //obtener parametro de tipo de la URL

  
     useEffect(() => {
        const validTypes: TypeOfPublication[] = ["encontrado", "perdido", "adopción"];
        if (!type || !validTypes.includes(type)) {
            // Redireccionar si el tipo no es válido o está ausente
            console.warn(`Tipo de publicación inválido o ausente: ${type}. Redireccionando...`);
            navigate('/'); // Redireccionar al inicio
            toast.error('La página solicitada no es válida.', { theme: "colored", autoClose: 3000 });
            return; // Detiene la ejecución del resto del useEffect
        }
        const getCatPots = async () => {
            try {
                setLoading(true);
                const response = await getAllCatPostsByType(type);
                if (response.status === 'success' && response.posts) {
                    setCatPosts(response.posts);
                    console.log(catPosts)
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
        <div>{type}</div>
    )
}

export default AllPosts