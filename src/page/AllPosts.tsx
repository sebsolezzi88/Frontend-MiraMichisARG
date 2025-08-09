import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import type { CatPost, TypeOfPublication } from "../types/types";
import { useNavigate, useParams } from "react-router-dom";
import { getAllCatPostsByType } from "../api/catPost";
import CatCardFound from "../components/CatCardFound";
import CatCardLost from "../components/CatCardLost";
import CatCardAdoption from "../components/CatCardAdoption";

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
    }, [type])
    
    const getHeading = (type: string) => {
        switch (type) {
            case 'encontrado':
                return 'Michis Encontrados';
            case 'perdido':
                return 'Michis Perdidos';
            case 'adopción':
                return 'Michis en Adopción';
            default:
                return 'Publicaciones';
        }
    };

    if (loading) return <div>Cargado...</div>

    if (error) return <div>{error}</div>

    return (
        <>
            <div className="max-w-7xl mx-auto space-y-10">
                <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                   {getHeading(type!)}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {catPosts.length > 0 
                        ? catPosts.map((post) => {
                            switch (post.typeOfPublication) {
                            case 'encontrado':
                                return <CatCardFound key={post._id} post={post} />;
                            case 'perdido':
                                return <CatCardLost key={post._id} post={post} />;
                            case 'adopción':
                                return <CatCardAdoption key={post._id} post={post} />;
                            default:
                                return null; // O algún componente de fallback
                            }
                        })
                        : <p className="text-center col-span-full">En estos momentos no hay publicaciones</p>
                    }
                </div>
            </div>
        </>
    )
}

export default AllPosts