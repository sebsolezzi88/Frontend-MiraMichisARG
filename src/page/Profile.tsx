import { Link } from 'react-router-dom';
import anonCat from '../assets/anoncat.png';
import { useEffect, useState } from 'react';
import type { CatPost } from '../types/types';
import { getCatPosts } from '../api/catPost';
import CatCardUser from '../components/CatCardUser';


const Profile = () => {

    //Estado de los catPost
    const [catPosts, setCatPosts] = useState<CatPost[]>([]);

    //Llamada para recuperar todos los CatPost del usuario logueado
    useEffect(() => {
        const getCatPostByUserId = async () => {
            const response = await getCatPosts();
            if (response.status === 'success') {
                setCatPosts(response.posts);
            }
        }
        getCatPostByUserId();
    }, [])



    return (
        <div className="bg-amber-50 min-h-screen p-6">

            <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-lg p-8 space-y-8">
                <div className="text-center pb-4 border-b border-gray-200 relative">
                    <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
                        <img className="w-24 h-24 rounded-full border-4 border-white shadow-md object-cover"
                            src={anonCat}
                            alt="Avatar de usuario" />
                    </div>

                    <h2 className="text-4xl font-extrabold text-gray-800 pt-12 mb-2">
                        ¡Hola, !
                    </h2>
                    <p className="text-lg text-gray-600">
                        Administra tus publicaciones y tu perfil aquí.
                    </p>

                    <a href="#" className="inline-flex items-center mt-4 px-4 py-2 border border-transparent 
                               rounded-md shadow-sm text-sm font-medium text-white 
                               bg-blue-500 hover:bg-blue-600 focus:outline-none 
                               focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 
                               transition duration-300">
                        Editar Perfil
                    </a>
                </div>

                <nav className="flex flex-col md:flex-row md:justify-center md:space-x-4 
            border-b border-gray-200 pb-4 space-y-2 md:space-y-0">
                    <a href="#" className="py-2 px-4 text-orange-600 border-b-2 border-orange-600 
                      font-semibold hover:text-orange-700 text-center">
                        Todas mis Publicaciones
                    </a>
                    <a href="#" className="py-2 px-4 text-gray-600 border-b-2 border-transparent 
                      hover:border-gray-300 hover:text-gray-800 font-medium text-center">
                        Michis en Adopción
                    </a>
                    <a href="#" className="py-2 px-4 text-gray-600 border-b-2 border-transparent 
                      hover:border-gray-300 hover:text-gray-800 font-medium text-center">
                        Michis Encontrados
                    </a>
                    <a href="#" className="py-2 px-4 text-gray-600 border-b-2 border-transparent 
                      hover:border-gray-300 hover:text-gray-800 font-medium text-center">
                        Michis Perdidos
                    </a>
                    <Link
                        to={'/newcatpost'}
                        className="py-2 px-4 bg-orange-500 text-white rounded-md font-semibold 
                      hover:bg-orange-600 transition duration-300 text-center">
                        + Nueva Publicación
                    </Link>
                </nav>


                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">


                {/* Mostrar los catpost si los hay */}
                {catPosts.length === 0 ? <p>No haz ingresado ningun gato</p>:
                    catPosts.map(catPost => <CatCardUser catPost={catPost}/>)
                }



                </div>
            </div>

        </div>
    )
}

export default Profile