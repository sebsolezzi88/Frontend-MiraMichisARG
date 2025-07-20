import { useState, type ChangeEvent, type FormEvent } from "react"
import { Link } from "react-router-dom"
import type { ApiResponse, RegisterData, RegisterFormData } from "../types/types"
import { areEmptyFields } from "../utils/utils";
import { toast, ToastContainer } from "react-toastify";
import { registerUser } from "../api/user";
import type { AxiosError } from "axios";

const Register = () => {

    //Estado para el uso del formulario
    const [formData, setFormData] = useState<RegisterFormData>({
        username: "",
        name: "",
        lastName: "",
        email: "",
        password: "",
        passwordrep: "",
        city: "",
        province: "",
    });

    //Funcion para cambiar el estado formData segun el inputchange
    const handletChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    //Funcion para cambiar el estado formData segun el select
    const handletSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    //Funcion submit form
    const handletSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (areEmptyFields(formData)) {
            toast.error('Debe Completar todos los campos',{theme: "colored",autoClose:2000});
            return;
        }
        //Si no hay campoas vacios creamos el objeto para Registrarse
        const registerData :RegisterData ={
            username: formData.username,
            name: formData.name,
            lastName: formData.lastName,
            email: formData.email,
            password: formData.password,
            passwordrep: formData.passwordrep,
            location:{
                city:formData.city,
                province: formData.province
            }
        };
        try {
            const response = await registerUser(registerData);
            if(response.status === 'success'){
                toast.success(response.message,{theme: "colored",autoClose:2000});
            }
        } catch (error) {
            const err = error as AxiosError<ApiResponse>;
            if (err.response?.data?.message) {
                toast.error('Error Desconocido',{theme: "colored",autoClose:2000});
            } else {
                toast.error('Error Desconocido',{theme: "colored",autoClose:2000});
            } 
            console.log(err);
        }
    }

    return (
        <>
        <ToastContainer/>
            <div className="max-w-lg w-full bg-white rounded-xl shadow-lg p-8 space-y-6">
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold text-gray-800 mb-2">
                        ¡Únete a la Comunidad Michi!
                    </h2>
                    <p className="text-gray-600">
                        Regístrate para adoptar, encontrar o reportar michis.
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
                            placeholder="Elige un nombre de usuario"
                            className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm 
                           focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                        <input
                            onChange={handletChange}
                            value={formData.name}
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Tu nombre"
                            className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm 
                           focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Apellido</label>
                        <input
                            onChange={handletChange}
                            value={formData.lastName}
                            type="lastName"
                            id="lastName"
                            name="lastName"
                            placeholder="Tu apellido"
                            className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm 
                           focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico</label>
                        <input
                            onChange={handletChange}
                            value={formData.email}
                            type="email"
                            id="email"
                            name="email"
                            placeholder="ejemplo@correo.com"
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
                            placeholder="Mínimo 8 caracteres"
                            className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm 
                           focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="passwordrep" className="block text-sm font-medium text-gray-700 mb-1">Repetir Contraseña</label>
                        <input
                            onChange={handletChange}
                            value={formData.passwordrep}
                            type="password"
                            id="passwordrep"
                            name="passwordrep"
                            placeholder="Confirma tu contraseña"
                            className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm 
                           focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">Ciudad</label>
                        <input
                            onChange={handletChange}
                            value={formData.city}
                            type="text"
                            id="city"
                            name="city"
                            placeholder="Ej. Buenos Aires"
                            className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm 
                           focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="province" className="block text-sm font-medium text-gray-700 mb-1">Provincia</label>
                        <select
                            onChange={handletSelect}
                            value={formData.province}
                            id="province"
                            name="province"
                            className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm 
                           focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                            required
                        >
                            <option value="">Selecciona una provincia</option>
                            <option value="Buenos Aires">Buenos Aires</option>
                            <option value="CABA">Ciudad Autónoma de Buenos Aires (CABA)</option>
                            <option value="Catamarca">Catamarca</option>
                            <option value="Chaco">Chaco</option>
                            <option value="Chubut">Chubut</option>
                            <option value="Córdoba">Córdoba</option>
                            <option value="Corrientes">Corrientes</option>
                            <option value="Entre Ríos">Entre Ríos</option>
                            <option value="Formosa">Formosa</option>
                            <option value="Jujuy">Jujuy</option>
                            <option value="La Pampa">La Pampa</option>
                            <option value="La Rioja">La Rioja</option>
                            <option value="Mendoza">Mendoza</option>
                            <option value="Misiones">Misiones</option>
                            <option value="Neuquén">Neuquén</option>
                            <option value="Río Negro">Río Negro</option>
                            <option value="Salta">Salta</option>
                            <option value="San Juan">San Juan</option>
                            <option value="San Luis">San Luis</option>
                            <option value="Santa Cruz">Santa Cruz</option>
                            <option value="Santa Fe">Santa Fe</option>
                            <option value="Santiago del Estero">Santiago del Estero</option>
                            <option value="Tierra del Fuego">Tierra del Fuego</option>
                            <option value="Tucumán">Tucumán</option>
                        </select>
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
                            Registrarse
                        </button>
                    </div>
                </form>

                <div className="text-center text-sm text-gray-600">
                    ¿Ya tienes cuenta?&nbsp;
                    <Link to={'/login'}><span className="font-medium text-orange-600 hover:text-orange-500">
                        Inicia Sesión aquí</span>
                    </Link>

                </div>
            </div>
        </>
    )
}

export default Register