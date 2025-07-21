import { useEffect, useState, type FormEvent } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import type { ResetPasswordFormDataWithToken } from "../types/types";


const ResetPassword = () => {

    const navigate = useNavigate(); //Navegador
    const [searchParams, setSearchParams] = useSearchParams(); //buscar parametro token
    const token = searchParams.get('token');
    const [formData, setFormData] = useState<ResetPasswordFormDataWithToken>(
        { password: '', passwordrep: '', token: '' });

    useEffect(() => {
        if (!token) {
            navigate('/register');
            return; 
        }
        if(formData.token !== token){
            setFormData({ ...formData, token: token });
        }
    }, [])

  
    const handletSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const { password, passwordrep, token } = formData;
        if (password !== passwordrep) {
            return toast.error("Los password deben coincidir", { theme: "colored", autoClose: 3000 });
        }
        if (!token || token.trim() === '') {
            return toast.error("Se requiere un token", { theme: "colored", autoClose: 3000 });
        }
    }



    return (
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 space-y-6">
            <div className="text-center">
                <h2 className="text-2xl font-extrabold text-gray-800 mb-2">
                    Resetea tu password
                </h2>
            </div>

            <form onSubmit={handletSubmit} className="space-y-4">
                <div>
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <input
                        onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                        value={formData.password}
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Tu nombre de usuario"
                        className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm 
                           focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">Repetir Password</label>
                    <input
                        onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                        value={formData.passwordrep}
                        type="password"
                        id="passwordrep"
                        name="passwordrep"
                        placeholder="Tu nombre de usuario"
                        className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm 
                           focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                        required
                    />
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
                        Reestrablecer
                    </button>
                </div>
            </form>


        </div>
    )
}

export default ResetPassword