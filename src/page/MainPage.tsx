import { useEffect, useState } from "react"
import { toast } from "react-toastify";
import { getAllCatPosts } from "../api/catPost";
import type { CatPost } from "../types/types";


const MainPage = () => {

  const [catPost, setCatPost] = useState<CatPost[]| null >();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const getCatPots = async () =>{
      try {
        setLoading(true);
        const response = await getAllCatPosts();
        if(response.status==='success' && response.posts){
            setCatPost(response.posts);
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

      <section>
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                Michis Buscando un Hogar
            </h2>

             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

             </div>
      </section>
    </div>
  )
}

export default MainPage