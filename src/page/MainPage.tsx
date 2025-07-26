import { useEffect, useState } from "react"
import { toast } from "react-toastify";
import { getAllCatPosts } from "../api/catPost";
import type { CatPost } from "../types/types";
import CatCardAdoption from "../components/CatCardAdoption";
import CatCardLost from "../components/CatCardLost";
import CatCardFound from "../components/CatCardFound";


const MainPage = () => {

  const [catPosts, setCatPosts] = useState<CatPost[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const [adoptionPosts, setAdoptionPosts] = useState<CatPost[]>([]); //Para filtrar los post de adopción
  const [lostPosts, setLostPosts] = useState<CatPost[]>([]); //Para filtrar los post de perdidos
  const [foundPosts, setFoundPosts] = useState<CatPost[]>([]); //Para filtrar los post de encontrados


  useEffect(() => {
    const getCatPots = async () =>{
      try {
        setLoading(true);
        const response = await getAllCatPosts();
        if(response.status==='success' && response.posts){
            const filteredAdoptionPosts = response.posts.filter(post => post.typeOfPublication === 'adopción').slice(0,3);
            const filteredLostPosts = response.posts.filter(post => post.typeOfPublication === 'perdido').slice(0,3);
            const filteredFoundPosts = response.posts.filter(post => post.typeOfPublication === 'encontrado').slice(0,3);

            setAdoptionPosts(filteredAdoptionPosts);
            setLostPosts(filteredLostPosts);
            setFoundPosts(filteredFoundPosts);
        }else{
          toast.error('Hubo un problema al obtener Post', { theme: "colored", autoClose: 3000 });
          setError('No se pudieron obtener los Post');
        }
      } catch (error) {
        console.log(error);
        setError(error as string);
        toast.error('Error al obtener los catpost', { theme: "colored", autoClose: 3000 });
      }finally{
        setLoading(false);
      }
    }
    getCatPots();
  }, [])

  

  if(loading) return <div>Cargado...</div>

  if(error) return <div>{error}</div>
  
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

      {/* Sección para mostrar los gatos en adopción  */}
      <section>
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                Michis Buscando un Hogar
            </h2>

             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {adoptionPosts.length > 0 
                    ? adoptionPosts.map(post => <CatCardAdoption key={post._id} post={post}/>)
                    : "En estos momentos no hay michis en adopción"
                  }
             </div>
             <div className="text-center mt-8">
                <a href="#" className="inline-flex items-center px-6 py-3 border border-transparent 
                                   rounded-md shadow-sm text-base font-medium text-white 
                                   bg-orange-500 hover:bg-orange-600 focus:outline-none 
                                   focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 
                                   transition duration-300">
                    Ver todos los Michis en Adopción
                </a>
            </div>
      </section>

      {/* Sección para mostrar los gatos perdidos  */}
      <section>
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                Estos Michis se encuentran perdidos
            </h2>

             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {lostPosts.length > 0 
                    ? lostPosts.map(post => <CatCardLost key={post._id} post={post}/>)
                    : "En estos momentos no hay michis perdidos"
                  }
             </div>

             <div className="text-center mt-8">
                <a href="#" className="inline-flex items-center px-6 py-3 border border-transparent 
                                   rounded-md shadow-sm text-base font-medium text-white 
                                   bg-orange-500 hover:bg-orange-600 focus:outline-none 
                                   focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 
                                   transition duration-300">
                    Ver todos los Michis Perdidos
                </a>
            </div>
      </section>

      {/* Sección para mostrar los gatos encontrados  */}
      <section>
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                Estos Michis fueron encontrados
            </h2>

             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {foundPosts.length > 0 
                    ? foundPosts.map(post => <CatCardFound key={post._id} post={post}/>)
                    : "En estos momentos no hay michis encontrados"
                  }
             </div>

             <div className="text-center mt-8">
                <a href="#" className="inline-flex items-center px-6 py-3 border border-transparent 
                                   rounded-md shadow-sm text-base font-medium text-white 
                                   bg-orange-500 hover:bg-orange-600 focus:outline-none 
                                   focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 
                                   transition duration-300">
                    Ver todos los Michis Encontrados
                </a>
            </div>
      </section>
      
    </div>
   
  )
}

export default MainPage