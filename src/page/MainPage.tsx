import { useEffect, useState } from "react"
import { toast } from "react-toastify";
import { getAllCatPosts } from "../api/catPost";
import type { BlogPost, CatPost } from "../types/types";
import CatCardAdoption from "../components/CatCardAdoption";
import CatCardLost from "../components/CatCardLost";
import CatCardFound from "../components/CatCardFound";
import { Link } from "react-router-dom";
import { getAllBlogPosts } from "../api/blog";
import BlogCardMain from "../components/BlogCardMain";


const MainPage = () => {

  const [catPosts, setCatPosts] = useState<CatPost[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);

  const [loadingCats, setLoadingCats] = useState<boolean>(false); // Estado de carga para los gatos
  const [loadingBlogs, setLoadingBlogs] = useState<boolean>(false); // Estado de carga para los blogs
  const [errorCats, setErrorCats] = useState<string>('');
  const [errorBlogs, setErrorBlogs] = useState<string>('');
  // ...

  const [adoptionPosts, setAdoptionPosts] = useState<CatPost[]>([]); //Para filtrar los post de adopción
  const [lostPosts, setLostPosts] = useState<CatPost[]>([]); //Para filtrar los post de perdidos
  const [foundPosts, setFoundPosts] = useState<CatPost[]>([]); //Para filtrar los post de encontrados


  //Effect para cargar los Post de gatos
  useEffect(() => {
    const getCatPots = async () => {
      try {
        setLoadingCats(true);
        const response = await getAllCatPosts();
        if (response.status === 'success' && response.posts) {
          const filteredAdoptionPosts = response.posts.filter(post => post.typeOfPublication === 'adopción').slice(0, 3);
          const filteredLostPosts = response.posts.filter(post => post.typeOfPublication === 'perdido').slice(0, 3);
          const filteredFoundPosts = response.posts.filter(post => post.typeOfPublication === 'encontrado').slice(0, 3);

          setAdoptionPosts(filteredAdoptionPosts);
          setLostPosts(filteredLostPosts);
          setFoundPosts(filteredFoundPosts);
        } else {
          toast.error('Hubo un problema al obtener Post', { theme: "colored", autoClose: 3000 });
          setErrorCats('No se pudieron obtener los Post');
        }
      } catch (error) {
        console.log(error);
        setErrorCats(error as string);
        toast.error('Error al obtener los catpost', { theme: "colored", autoClose: 3000 });
      } finally {
        setLoadingCats(false);
      }
    }
    getCatPots();
  }, [])

  //Effect para cargar las notas de blog
  useEffect(() => {
    const getBlogPosts = async () => {
      try {
        setLoadingBlogs(true);
        const response = await getAllBlogPosts();
        if (response.status === 'success' && response.blogPosts) {
          setBlogPosts(response.blogPosts.slice(0, 3)); // Muestra los 3 últimos
        } else {
          toast.error('Hubo un problema al obtener las notas', { theme: "colored" });
          setErrorBlogs('No se pudieron obtener las notas');
        }
      } catch (error) {
        console.error(error);
        setErrorBlogs(error as string);
        toast.error('Error al obtener las notas', { theme: "colored" });
      } finally {
        setLoadingBlogs(false);
      }
    };
    getBlogPosts();
  }, []);


  if (loadingCats || loadingBlogs) return <div>Cargando...</div>;
  if (errorCats || errorBlogs) return <div>{errorCats || errorBlogs}</div>;

  return (

    <div className="max-w-7xl mx-auto space-y-10">
      <main className="bg-orange-100 rounded-xl shadow-md p-8 text-center">
        <h2 className="text-4xl font-extrabold text-orange-800 mb-4">
          ¡Bienvenido a MiraMichis ARG!
        </h2>
        <p className="text-lg text-orange-700 max-w-2xl mx-auto">
          Tu comunidad para encontrar, adoptar y ayudar a michis en <span className="font-extrabold">Argentina</span>.
        </p>
      </main>

      {/* Sección de notas de blog */}
      <section>
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Últimas Notas
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.length > 0
            ? blogPosts.map(post => <BlogCardMain key={post._id} post={post}/>)
            : "No hay notas de blog para mostrar."
          }
        </div>

        <div className="text-center mt-8">
          <Link to={'/catpost/adopción'} className="inline-flex items-center px-6 py-3 border border-transparent 
                                   rounded-md shadow-sm text-base font-medium text-white 
                                   bg-orange-500 hover:bg-orange-600 focus:outline-none 
                                   focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 
                                   transition duration-300">
            Ver Más Notas
          </Link>
        </div>
      </section>
      {/* Sección para mostrar los gatos en adopción  */}
      <section>
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Michis Buscando un Hogar
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {adoptionPosts.length > 0
            ? adoptionPosts.map(post => <CatCardAdoption key={post._id} post={post} />)
            : "En estos momentos no hay michis en adopción"
          }
        </div>
        <div className="text-center mt-8">
          <Link to={'/catpost/adopción'} className="inline-flex items-center px-6 py-3 border border-transparent 
                                   rounded-md shadow-sm text-base font-medium text-white 
                                   bg-orange-500 hover:bg-orange-600 focus:outline-none 
                                   focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 
                                   transition duration-300">
            Ver todos los Michis en Adopción
          </Link>
        </div>
      </section>

      {/* Sección para mostrar los gatos perdidos  */}
      <section>
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Estos Michis se encuentran perdidos
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lostPosts.length > 0
            ? lostPosts.map(post => <CatCardLost key={post._id} post={post} />)
            : "En estos momentos no hay michis perdidos"
          }
        </div>

        <div className="text-center mt-8">
          <Link to={'/catpost/perdido'} className="inline-flex items-center px-6 py-3 border border-transparent 
                                   rounded-md shadow-sm text-base font-medium text-white 
                                   bg-orange-500 hover:bg-orange-600 focus:outline-none 
                                   focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 
                                   transition duration-300">
            Ver todos los Michis Perdidos
          </Link>
        </div>
      </section>

      {/* Sección para mostrar los gatos encontrados  */}
      <section>
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Estos Michis fueron encontrados
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {foundPosts.length > 0
            ? foundPosts.map(post => <CatCardFound key={post._id} post={post} />)
            : "En estos momentos no hay michis encontrados"
          }
        </div>

        <div className="text-center mt-8">
          <Link to={'/catpost/encontrado'} className="inline-flex items-center px-6 py-3 border border-transparent 
                                   rounded-md shadow-sm text-base font-medium text-white 
                                   bg-orange-500 hover:bg-orange-600 focus:outline-none 
                                   focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 
                                   transition duration-300">
            Ver todos los Michis Encontrados
          </Link>
        </div>
      </section>

    </div>

  )
}

export default MainPage