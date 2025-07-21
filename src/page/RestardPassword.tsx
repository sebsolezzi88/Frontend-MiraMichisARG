import { useState, type FormEvent } from "react"
import { toast } from "react-toastify";


const RestardPassword = () => {
    const [email, setEmail] = useState<string>('');


    //submit form
    const handletSubmit = async (e:FormEvent) =>{
        e.preventDefault();
        if(email.trim() === ''){
            toast.error("Debe ingresar un password", { theme: "colored", autoClose: 3000 });
        }
    }

  return (
    <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 space-y-6">
            <div className="text-center">
                <h2 className="text-2xl font-extrabold text-gray-800 mb-2">
                    ¿No recuerdas tu contraseña?
                </h2>
                <p className="text-gray-600">
                    Ingresa tu email para resetear tu password.
                </p>
            </div>

            <form onSubmit={handletSubmit} className="space-y-4">
                <div>
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                        onChange={(e)=>setEmail(e.target.value)}
                        value={email}
                        type="email"
                        id="email"
                        name="email"
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

export default RestardPassword