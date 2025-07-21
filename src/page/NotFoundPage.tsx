import cat404Image from '../assets/cat404.png';

const NotFoundPage = () => {
  return (
    
    <div className='min-h-screen flex items-center justify-center p-4'>
        <div className="max-w-xl w-full bg-white rounded-xl shadow-lg p-8 text-center space-y-6">
            <h2 className="text-6xl font-extrabold text-orange-600">
                404
            </h2>
            <h3 className="text-3xl font-bold text-gray-800 mb-2">
                ¡Oops! Página No Encontrada
            </h3>
            <p className="text-lg text-gray-600 mb-4">
                Parece que el michi se llevó esta página a otro lado.
                No pudimos encontrar lo que buscabas.
            </p>
            
            <img src={cat404Image} alt="Michi Confundido 404" className="mx-auto w-48 h-48 object-contain mb-6"/>

            <a href="/" className="inline-flex items-center px-6 py-3 border border-transparent 
                            rounded-md shadow-sm text-base font-medium text-white 
                            bg-orange-500 hover:bg-orange-600 focus:outline-none 
                            focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 
                            transition duration-300">
                Volver a la Página Principal
            </a>
        </div>
    </div>
  )
}

export default NotFoundPage