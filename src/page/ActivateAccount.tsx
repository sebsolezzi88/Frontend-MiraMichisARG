import { useEffect, useState } from "react"
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom"
import { activateUserAccount } from "../api/user";
import cat404Image from '../assets/cat404.png';
import cat200Image from '../assets/cat200.png';



const ActivateAccount = () => {

    const [isActivate, setIsActivate] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const navigate = useNavigate(); //Navegador
    const [searchParams, setSearchParams] = useSearchParams(); //buscar parametro token
    const token = searchParams.get('token'); 

    useEffect(() => {

        if(!token) navigate('/register');
        
        const activateAccound = async () => {
            try {
                const response = await activateUserAccount(token!);
                if(response.status === 'success'){
                    setIsActivate(true);
                    setIsLoading(false);
                }
            } catch (error) {
                console.log(error);
                setIsLoading(false);
            }
        }
        activateAccound();
    }, [])

     if (isLoading) {
        return (
            <div className="bg-amber-50 min-h-screen flex items-center justify-center p-4">
                <div className="max-w-xl w-full bg-white rounded-xl shadow-lg p-8 text-center space-y-6">
                    <h3 className="text-3xl font-bold text-gray-800 mb-2">
                        Activando tu cuenta...
                    </h3>
                    {/* Puedes añadir un spinner o una imagen de carga aquí */}
                    <svg className="animate-spin mx-auto h-12 w-12 text-orange-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <p className="text-lg text-gray-600">Por favor, espera un momento.</p>
                </div>
            </div>
        );
    }

    // 2. Mostrar mensaje de activación exitosa o error después de que la carga termine
    return (
        <div className="bg-amber-50 min-h-screen flex items-center justify-center p-4">
            {isActivate ? (
                // Mensaje de éxito
                <div className="max-w-xl w-full bg-white rounded-xl shadow-lg p-8 text-center space-y-6">
                    <h2 className="text-6xl font-extrabold text-green-600">
                        ¡Éxito!
                    </h2>
                    <h3 className="text-3xl font-bold text-gray-800 mb-2">
                        ¡Tu cuenta fue activada!
                    </h3>
                    <p className="text-lg text-gray-600 mb-4">
                        Ya puedes iniciar sesión en MiraMichis.
                    </p>
                    
                    <img src={cat200Image} alt="Michi Feliz" className="mx-auto w-48 h-48 object-contain mb-6"/>

                    <Link to={'/login'} className="inline-flex items-center px-6 py-3 border border-transparent 
                                rounded-md shadow-sm text-base font-medium text-white 
                                bg-orange-500 hover:bg-orange-600 focus:outline-none 
                                focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 
                                transition duration-300">
                        Ir a Iniciar Sesión
                    </Link>
                </div>
            ) : (
                // Mensaje de error (página no encontrada o error de activación)
                <div className="max-w-xl w-full bg-white rounded-xl shadow-lg p-8 text-center space-y-6">
                    <h2 className="text-6xl font-extrabold text-red-600">
                        Error
                    </h2>
                    <h3 className="text-3xl font-bold text-gray-800 mb-2">
                        No se pudo activar tu cuenta.
                    </h3>
                    <p className="text-lg text-gray-600 mb-4">
                        El enlace puede ser inválido o haber expirado. Por favor, verifica o intenta registrarte de nuevo.
                    </p>
                    
                    <img src={cat404Image} alt="Michi Triste" className="mx-auto w-48 h-48 object-contain mb-6"/>

                    <Link to={'/register'} className="inline-flex items-center px-6 py-3 border border-transparent 
                                rounded-md shadow-sm text-base font-medium text-white 
                                bg-orange-500 hover:bg-orange-600 focus:outline-none 
                                focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 
                                transition duration-300">
                        Volver al Registro
                    </Link>
                </div>
            )}
        </div>
    );
}

export default ActivateAccount