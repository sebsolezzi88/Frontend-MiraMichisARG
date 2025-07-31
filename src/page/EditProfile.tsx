import { useEffect, useState, type FormEvent } from "react"
import type { ProfileFormData, UserData } from "../types/types";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import anonCat from '../assets/anoncat.png';
import { editProfile } from "../api/user";

const EditProfile = () => {

    const navigate = useNavigate();

    //EStado de la foto
    const [avatar, setAvatar] = useState<string>("");

    //Estado del EditForm
    const [profileFormData, setProfileFormData] = useState<ProfileFormData>(
        {
            name: '',
            lastName: '',
            bio: '',
            location: { city: '', province: '' },
            photo: null
        }
    );


    //Obtener del local Storage datos del perfil
    useEffect(() => {

        try {
            const data = localStorage.getItem('userData');
            const userData = JSON.parse(data!) as UserData;

            if (!userData) {
                navigate('/login');
                toast.error('Debe loguearse', { theme: "colored", autoClose: 3000 });
                return;
            }
            setAvatar(userData.avatarUrl);
            setProfileFormData(prevData => ({
                ...prevData,
                name: userData.name || '',
                lastName: userData.lastName || '',
                bio: userData.bio || '',
                location: {
                    city: userData.location?.city || '',
                    province: userData.location?.province || ''
                }
            }));
            console.log(profileFormData)


        } catch (error) {
            toast.error('No se logró obtener Avatar', { theme: "colored", autoClose: 3000 });
        }


    }, [])

    //handleChage
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (name === 'city' || name === 'province') {
            setProfileFormData(prev => ({
                ...prev,
                location: {
                    ...prev.location,
                    [name]: value
                }
            }));
        } else {
            setProfileFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    //handle Change para la foto
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setProfileFormData(prev => ({ ...prev, photo: e.target.files![0] }));
        } else {
            setProfileFormData(prev => ({ ...prev, photo: null }));
        }
    };

    //Handled submit
    const handletSubmit = async (e: FormEvent) => {
        e.preventDefault();

        console.log(profileFormData);

        try {
            if (profileFormData.name === '' ||
                profileFormData.lastName === '' ||
                profileFormData.location.city === '' ||
                profileFormData.location.province === ''
            ) {
                return toast.error('Nombre, Apellido,  \n Ciudad y Provincia son obligatorios', { theme: "colored", autoClose: 3000 });
            }

            //Guardar Cambios
            const response = await editProfile(profileFormData);
            if(response.status=== 'success'){
                toast.success('Perfil actulizado', { theme: "colored", autoClose: 3000 });
                //guardar en local stora los Cambios
                localStorage.setItem('userData',JSON.stringify(response.user));
            }
        } catch (error) {
            console.log(error);
            toast.error('Error al actulizar perfil', { theme: "colored", autoClose: 3000 });
        }
    }

    return (
        <div className="bg-amber-50 min-h-screen flex items-center justify-center p-4">
            <div className="max-w-xl w-full bg-white rounded-xl shadow-lg p-8 space-y-6">
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold text-gray-800 mb-2">
                        Editar Tu Perfil
                    </h2>
                    <p className="text-gray-600">
                        Actualiza tu información personal y tu foto de perfil.
                    </p>
                </div>

                <form onSubmit={handletSubmit} method="POST" encType="multipart/form-data" className="space-y-4">
                    <div className="flex flex-col items-center mb-6">
                        <div className="w-32 h-32 rounded-full border-4 border-gray-200 shadow-md overflow-hidden mb-4 relative group">
                            <img className="w-full h-full object-cover"
                                src={avatar ? avatar : anonCat}
                                alt="Avatar actual del usuario" />

                        </div>
                        <label htmlFor="profile_picture" className="block text-sm font-medium text-gray-700 mb-2">Cambiar Foto de Perfil</label>
                        <input
                            onChange={handleFileChange}
                            type="file"
                            id="profile_picture"
                            name="profile_picture"
                            accept="image/*"
                            className="block w-full text-sm text-gray-500
                           file:mr-4 file:py-2 file:px-4
                           file:rounded-md file:border-0
                           file:text-sm file:font-semibold
                           file:bg-orange-50 file:text-orange-700
                           hover:file:bg-orange-100 cursor-pointer"
                        />

                    </div>

                    <div>
                        <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                        <textarea
                            onChange={handleChange}
                            value={profileFormData.bio}
                            id="bio"
                            name="bio"
                            rows={4}
                            maxLength={150}
                            placeholder="Cuenta lo que quieras sobre ti."
                            className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm
                                               focus:ring-orange-500 focus:border-orange-500 sm:text-sm resize-y"
                            required
                        ></textarea>
                    </div>
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                        <input
                            onChange={handleChange}
                            value={profileFormData.name}
                            type="text"
                            id="nombre"
                            name="name"
                            className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm
                           focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Apellido</label>
                        <input
                            onChange={handleChange}
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={profileFormData.lastName}
                            className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm
                           focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">Ciudad</label>
                        <input
                            onChange={handleChange}
                            type="text"
                            id="city"
                            name="city"
                            value={profileFormData.location.city}
                            className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm
                           focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="province" className="block text-sm font-medium text-gray-700 mb-1">Provincia</label>
                        <select
                            onChange={handleChange}
                            id="province"
                            name="province"
                            value={profileFormData.location.province}
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
                            Guardar Cambios
                        </button>
                    </div>
                </form>
            </div>
        </div>


    )
}

export default EditProfile