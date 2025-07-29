import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getCatPosAndCommentstById } from "../api/comment";
import type { PostComment, PostFullData } from "../types/types";
import CatPostComments from "../components/CatPostComments";


const CatPostDetails = () => {


    const [postData, setPostData] = useState<PostFullData | null>(null);
    const [commentData, setCommentData] = useState<PostComment[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const navigate = useNavigate();

    const {id} = useParams() //obtener parametro de tipo de la URL

  
     useEffect(() => {
     
        if (!id ) {
            // Redireccionar si no hay id
            console.warn(`EL id del post es requerido. Redireccionando...`);
            navigate('/'); // Redireccionar al inicio
            toast.error('La post id no encontrado.', { theme: "colored", autoClose: 3000 });
            return; // Detiene la ejecución del resto del useEffect
        }
        const getCatPots = async () => {
            try {
                setLoading(true);
                const response = await getCatPosAndCommentstById(id);
                if (response.status === 'success' && response.post) {
                    setPostData(response.post);
                    setCommentData(response.comments);
                } else {
                    toast.error('Hubo un problema al obtener Post ', { theme: "colored", autoClose: 3000 });
                    setError('No se pudieron obtener el Post ni comentarios ');
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

    if (!postData) return <div>Cargando datos del michi...</div>;

  return (
     <CatPostComments postData={postData} commentData={commentData} setCommentData={setCommentData}/>
  )
}

export default CatPostDetails