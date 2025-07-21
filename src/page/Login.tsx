
import { useState, type ChangeEvent, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import type { ApiResponse, ExpressValidatorErrorResponse, LoginFormData } from '../types/types';
import { areEmptyFields } from '../utils/utils';
import { toast } from 'react-toastify';
import type { AxiosError } from 'axios';
import { loginUser } from '../api/user';
import { useAuthStore } from '../store/useAuthStore';

const Login = () => {

    const navigate = useNavigate();

    //Estado del form de login
    const [formData, setFormData] = useState<LoginFormData>({ username: '', password: '' });

    //Funcion para cambiar el estado formData segun el inputchange
    const handletChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handletSubmit = async (e: FormEvent) => {
        e.preventDefault();

        //chequiar campos
        if (areEmptyFields(formData)) {
            toast.error('Debe completar todos los campos', { theme: "colored", autoClose: 3000 });
            return;
        }

        //login de usuario
        try {

            const response = await loginUser(formData);
            if (response.status === 'success') {
                toast.success(response.message, { theme: "colored", autoClose: 2000 });
                // Guardar en localStorage para persistencia
                localStorage.setItem('authToken', response.user.token);
                localStorage.setItem('userData', JSON.stringify(response.user)); // Guarda todo el objeto user
                useAuthStore.getState().login(response.user);
                navigate('/'); //ir al main page
            }

        } catch (error) {
            const err = error as AxiosError<ApiResponse | ExpressValidatorErrorResponse>;

            if (err.response) {
                const errorData = err.response.data;

                // Caso 1: Error general de la API (ApiResponse)
                if (typeof errorData === 'object' && errorData !== null && 'status' in errorData && 'message' in errorData) {
                    const apiResponse = errorData as ApiResponse
                    toast.error(apiResponse.message || 'Error general de la API.', { theme: "colored", autoClose: 2000 });
                }
                // Caso 2: Errores de validación de Express Validator (ExpressValidatorErrorResponse)
                // Ahora comprobamos si tiene la propiedad 'errors' y si 'errors' es un array no vacío
                else if (typeof errorData === 'object' && errorData !== null && 'errors' in errorData && Array.isArray((errorData as ExpressValidatorErrorResponse).errors) && (errorData as ExpressValidatorErrorResponse).errors.length > 0) {
                    const expressErrors = (errorData as ExpressValidatorErrorResponse).errors;
                    const validationMessages = expressErrors.map(e => e.msg).join('; ');
                    toast.error(`Errores de validación: ${validationMessages}`, { theme: "colored", autoClose: 2000 });
                }
                // Caso 3: Respuesta de error inesperada del servidor (no es ApiResponse ni ExpressValidatorErrorResponse)
                else {
                    toast.error('Respuesta de error del servidor inesperada.', { theme: "colored", autoClose: 2000 });
                }
            }
            // Caso 4: Errores que no tienen respuesta HTTP (ej. errores de red, timeouts)
            else if (err.message) {
                toast.error(`Error de conexión: ${err.message}`, { theme: "colored", autoClose: 2000 });
            }
            // Caso 5: Cualquier otro tipo de error desconocido
            else {
                toast.error('Error Desconocido. Consulta la consola para más detalles.', { theme: "colored", autoClose: 2000 });
            }
        }

    }

    return (
        <div className='min-h-screen flex items-center justify-center p-4'>
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
        </div>
    )
}

export default Login