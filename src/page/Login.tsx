
import { useState, type ChangeEvent, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import type { LoginFormData } from '../types/types';
import { areEmptyFields } from '../utils/utils';
import { toast } from 'react-toastify';

const Login = () => {

    //Estado del form de login
    const [formData, setFormData] = useState<LoginFormData>({username:'',password:''});

    //Funcion para cambiar el estado formData segun el inputchange
    const handletChange = (e: ChangeEvent<HTMLInputElement>) => {
            setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handletSubmit = (e:FormEvent)=>{
        e.preventDefault();

        //chequiar campos
        if(areEmptyFields(formData)){
            toast.error('Debe completar todos los campos', { theme: "colored", autoClose: 3000 });
            return;
        }
        
    }

  return (
    
    <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 space-y-6">
        <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-800 mb-2">
                Bienvenido de nuevo, Michi-Amigo
            </h2>
            <p className="text-gray-600">
                Inicia sesión para continuar tu aventura.
            </p>
        </div>

        <form onSubmit={handletSubmit} className="space-y-4">
            <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">Nombre de Usuario</label>
                <input
                    onChange={handletChange}
                    value={formData.username} 
                    type="text" 
                    id="username" 
                    name="username" 
                    placeholder="Tu nombre de usuario"
                    className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm 
                           focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                    required
                />
            </div>

            <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
                <input
                    onChange={handletChange}
                    value={formData.password}  
                    type="password" 
                    id="password" 
                    name="password" 
                    placeholder="Tu contraseña"
                    className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm 
                           focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                    required
                />
            </div>

            <div className="flex items-center justify-between">
                

                <div className="text-sm">
                    <a href="#" className="font-medium text-orange-600 hover:text-orange-500">
                        ¿Olvidaste tu contraseña?
                    </a>
                </div>
            </div>

            <div>
                <button 
                    type="submit" 
                    className="w-full flex justify-center py-2 px-4 border border-transparent 
                           rounded-md shadow-sm text-sm font-medium text-white 
                           bg-orange-500 hover:bg-orange-600 focus:outline-none 
                           focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 
                           transition duration-300"
                >
                    Iniciar Sesión
                </button>
            </div>
        </form>

        <div className="text-center text-sm text-gray-600">
            ¿No tienes cuenta? &nbsp;
            <Link to={'/register'}>
                <span className="font-medium text-orange-600 hover:text-orange-500"> 
                Regístrate aquí</span>
            </Link> 
        </div>
    </div>
  )
}

export default Login