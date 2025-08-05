import { Link } from 'react-router-dom';
import anonCat from '../assets/anoncat.png';
import { useEffect, useState } from 'react';
import type { BlogPost, CatPost, UserData } from '../types/types';
import { deleteCatPost, getCatPosts } from '../api/catPost';
import CatCardUser from '../components/CatCardUser';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import { getBlogPosts } from '../api/blog';


const Profile = () => {

    //Estado de los catPost
    const [catPosts, setCatPosts] = useState<CatPost[]>([]);
    //Estado de los NewBlogPost
    const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);

    const { user } = useAuth(); //Usar context para saber si es admin

    //Estado para filtrar
    const [typeOfPost, setTypeOfPost] = useState<'adopción' | 'encontrado' | 'perdido' | ''>('')

    //Estado para la imagen del avatar
    const [avatar, setAvatar] = useState<string>('');
    const [userName, setUserName] = useState<string>('');


    // Estado de carga
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        //Obtener el avatar del usuario
        try {
            const data = localStorage.getItem('userData');
            const userData = JSON.parse(data!) as UserData;
            setAvatar(userData.avatarUrl);
            setUserName(userData.username);
        } catch (error) {
            toast.error('No se logró obtener Avatar', { theme: "colored", autoClose: 3000 });
        }
        //Llamada para recuperar todos los CatPost del usuario logueado
        const getCatPostByUserId = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await getCatPosts();
                if (response.status === 'success') {
                    console.log(response.posts)
                    setCatPosts(response.posts);
                } else {
                    setCatPosts([]);
                }
            } catch (error) {
                console.error("Error al cargar publicaciones:", error);
                setError("No se pudieron cargar tus publicaciones.");
                setCatPosts([]);
            } finally {
                setLoading(false);
            }
        }
        //Llamada para recuperar todos los blogpost del usuario admin logueado
        const getBlogPostByUserId = async () => {

            if (user?.role === 'admin') {
                setLoading(true);
                setError(null);
                try {
                    const response = await getBlogPosts();
                    if (response.status === 'success') {
                        console.log("BLog post",response.blogPosts)
                        setBlogPosts(response.blogPosts);
                    } else {
                        setBlogPosts([]);
                    }
                } catch (error) {
                    console.error("Error al cargar publicaciones de blog:", error);
                    setError("No se pudieron cargar tus publicaciones de blog.");
                    setCatPosts([]);
                } finally {
                    setLoading(false);
                }
            }

        }
        getCatPostByUserId();
        getBlogPostByUserId();
    }, [])

    //Logica para filtrar
    const catPostsToDisplay = typeOfPost
        ? catPosts.filter(post => post.typeOfPublication === typeOfPost)
        : catPosts;

    const onDelete = async (id: string) => {
        try {
            const response = await deleteCatPost(id);
            if (response.status === 'success') {
                toast.success('Post borrado', { theme: "colored", autoClose: 3000 });
                setCatPosts(prevPosts => prevPosts.filter(post => post._id !== id)); //Filtrar post
            }
        } catch (error) {
            console.log(error)
            toast.error('Error al borrar el post', { theme: "colored", autoClose: 3000 })
        }
    }

    if (loading) {
        return <div className="text-center p-6 text-gray-700">Cargando tus publicaciones...</div>;
    }

    if (error) {
        return <div className="text-center p-6 text-red-600">Error: {error}</div>;
    }

    return (
        <div className="bg-amber-50 min-h-screen p-6">

            <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-lg p-8 space-y-8">
                <div className="text-center pb-4 border-b border-gray-200 relative">
                    <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
                        <img className="w-24 h-24 rounded-full border-4 border-white shadow-md object-cover"
                            src={avatar ? avatar : anonCat}
                            alt="Avatar de usuario" />
                    </div>

                    <h2 className="text-4xl font-extrabold text-gray-800 pt-12 mb-2">
                        ¡Hola, {userName} !
                    </h2>
                    <p className="text-lg text-gray-600">
                        Administra tus publicaciones y tu perfil aquí.
                    </p>

                    <Link to={'edit'} className="inline-flex items-center mt-4 px-4 py-2 border border-transparent 
                               rounded-md shadow-sm text-sm font-medium text-white 
                               bg-blue-500 hover:bg-blue-600 focus:outline-none 
                               focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 
                               transition duration-300">
                        Editar Perfil
                    </Link>
                </div>

                <nav className="flex flex-col md:flex-row md:justify-center md:space-x-4 
                            border-b border-gray-200 pb-4 space-y-2 md:space-y-0">
                    <button
                        onClick={() => setTypeOfPost('')} // Filtro: Mostrar todas las publicaciones
                        className={`py-2 px-4 text-center transition duration-300
                            ${typeOfPost === ''
                                ? 'text-orange-600 border-b-2 border-orange-600 font-semibold'
                                : 'text-gray-600 border-b-2 border-transparent hover:border-gray-300 hover:text-gray-800 font-medium'}`
                        }
                    >
                        Todas mis Publicaciones
                    </button>
                    <button
                        onClick={() => setTypeOfPost('adopción')} // Filtro: Michis en Adopción
                        className={`py-2 px-4 text-center transition duration-300
                            ${typeOfPost === 'adopción'
                                ? 'text-orange-600 border-b-2 border-orange-600 font-semibold'
                                : 'text-gray-600 border-b-2 border-transparent hover:border-gray-300 hover:text-gray-800 font-medium'}`
                        }
                    >
                        Michis en Adopción
                    </button>
                    <button
                        onClick={() => setTypeOfPost('encontrado')} // Filtro: Michis Encontrados
                        className={`py-2 px-4 text-center transition duration-300
                            ${typeOfPost === 'encontrado'
                                ? 'text-orange-600 border-b-2 border-orange-600 font-semibold'
                                : 'text-gray-600 border-b-2 border-transparent hover:border-gray-300 hover:text-gray-800 font-medium'}`
                        }
                    >
                        Michis Encontrados
                    </button>
                    <button
                        onClick={() => setTypeOfPost('perdido')} // Filtro: Michis Perdidos
                        className={`py-2 px-4 text-center transition duration-300
                            ${typeOfPost === 'perdido'
                                ? 'text-orange-600 border-b-2 border-orange-600 font-semibold'
                                : 'text-gray-600 border-b-2 border-transparent hover:border-gray-300 hover:text-gray-800 font-medium'}`
                        }
                    >
                        Michis Perdidos
                    </button>
                    <Link
                        to={'/newcatpost'}
                        className="py-2 px-4 bg-orange-500 text-white rounded-md font-semibold 
                      hover:bg-orange-600 transition duration-300 text-center">
                        + Nueva Publicación
                    </Link>
                    {user?.role === 'admin' &&
                        <Link
                            to={'/blog/new'}
                            className="py-2 px-4 bg-orange-500 text-white rounded-md font-semibold 
                      hover:bg-orange-600 transition duration-300 text-center">
                            + Nueva Entrada de Blog
                        </Link>
                    }

                </nav>


                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">


                    {/* Mostrar los catpost si los hay */}
                    {catPostsToDisplay.length === 0 ? <p>No haz ingresado ningun gato</p> :
                        catPostsToDisplay.map(catPost => <CatCardUser key={catPost._id} catPost={catPost} onDelete={onDelete} />)
                    }



                </div>
            </div>

        </div>
    )
}

export default Profile