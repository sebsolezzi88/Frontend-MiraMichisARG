import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import type { CatPost, CatPostFormData, Gender } from "../types/types";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getCatPostById } from "../api/catPost";

const CatPostToEdit = () => {



    const [searchParams] = useSearchParams();
    const postId = searchParams.get('postId'); //Buscamos el parametros en la url

    const navigate = useNavigate();
    const [catPost, setCatPost] = useState<CatPost | null>(null);
    const [existingPhotoUrl, setExistingPhotoUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState<CatPostFormData>({
        typeOfPublication: '',
        catName: '',
        gender: '',
        age: '',
        breed: '',
        description: '',
        city: '',
        province: '',
        photo: null,
    });

    useEffect(() => {
        if (!postId) {
            toast.error('Debe proporcionar un id', { theme: "colored", autoClose: 3000 });
            navigate('/profile');
        }
        //Si hay id buscamos el post
        const getCatPost = async () => {
            try {
                setLoading(true);
                const response = await getCatPostById(postId!);
                if (response.status === 'success' && response.post) {
                    const post = response.post;
                    setFormData({
                        typeOfPublication: post.typeOfPublication,
                        catName: post.catName || '',
                        gender: post.gender as Gender,
                        age: post.age || '',
                        breed: post.breed || '',
                        description: post.description,
                        city: post.location.city,
                        province: post.location.province,
                        photo: null, // No se carga el archivo aquí, el usuario debe seleccionar uno nuevo
                    });
                    setExistingPhotoUrl(post.photoUrl); // Guarda la URL de la foto existente
                } else {
                    setError(response.message || "Publicación no encontrada.");
                }
            } catch (error) {
                console.error("Error al cargar publicaciones:", error);
                toast.error("Error al cargar la publicación para editar.", { theme: "colored" });
                setError("No se pudieron cargar tus publicaciones.");
            } finally {
                setLoading(false);
            }
        }
        getCatPost();

    }, [])


    //submit del formulario

    const handletSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true); // Para el botón de enviar
        if (formData.typeOfPublication === '' || formData.gender === ''
            || formData.description === ''
            || formData.city === ''
            || formData.province === '') {
            toast.error('Tipo de Publicacion, \n ciudad, provincia son obligatorios',
                { theme: "colored", autoClose: 3000 });
            return;
        }
        try {
            if (!postId) {
                toast.error("ID de publicación faltante para actualizar.", { theme: "colored" });
                return;
            }

            const response = await updateCatPost(id, formData); // Tu función para actualizar
            if (response.status === 'success') {
                toast.success('Publicación actualizada exitosamente!', { theme: "colored", autoClose: 3000 });
                navigate('/profile'); // Redirige a la página de perfil 
            } else {
                toast.error(response.message || 'Error al actualizar la publicación.', { theme: "colored" });
            }
        } catch (err) {
            console.error("Error al enviar el formulario:", err);
            toast.error('Error al actualizar la publicación.', { theme: "colored" });
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return <div className="text-center p-6 text-gray-700">Cargando tu publicación...</div>;
    }

    if (error) {
        return <div className="text-center p-6 text-red-600">Error: {error}</div>;
    }

    return (
        <div className="bg-amber-50 min-h-screen flex items-center justify-center p-4">

            <div className="max-w-2xl w-full bg-white rounded-xl shadow-lg p-8 space-y-6">
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold text-gray-800 mb-2">
                        Edita tu publicación
                    </h2>

                </div>

                <form onSubmit={handletSubmit} encType="multipart/form-data" className="space-y-4">
                    <div>
                        <label htmlFor="typeOfPublication" className="block text-sm font-medium text-gray-700 mb-1">Tipo de Publicación</label>
                        <select
                            onChange={(e: ChangeEvent<HTMLSelectElement>) => { setFormData({ ...formData, [e.target.name]: e.target.value }) }}
                            value={formData.typeOfPublication}
                            id="typeOfPublication"
                            name="typeOfPublication"
                            className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm
                             focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                            required
                        >
                            <option value="">Selecciona el tipo de publicación</option>
                            <option value="adopción">En Adopción</option>
                            <option value="encontrado">Encontrado</option>
                            <option value="perdido">Perdido</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="catName" className="block text-sm font-medium text-gray-700 mb-1">Nombre del Michi (Opcional)</label>
                        <input
                            onChange={(e: ChangeEvent<HTMLInputElement>) => { setFormData({ ...formData, [e.target.name]: e.target.value }) }}
                            value={formData.catName}
                            type="text"
                            id="catName"
                            name="catName"
                            placeholder="Ej. Mittens, Luna, Bigotes"
                            className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm
                             focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                        />
                    </div>

                    <div>
                        <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">Género</label>
                        <select
                            onChange={(e: ChangeEvent<HTMLSelectElement>) => { setFormData({ ...formData, [e.target.name]: e.target.value }) }}
                            id="gender"
                            name="gender"
                            className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm
                             focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                            required
                        >
                            <option value="">Selecciona el género</option>
                            <option value="macho">Macho</option>
                            <option value="hembra">Hembra</option>
                            <option value="desconocido">Desconocido</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">Edad (Opcional)</label>
                        <input
                            onChange={(e: ChangeEvent<HTMLInputElement>) => { setFormData({ ...formData, [e.target.name]: e.target.value }) }}
                            value={formData.age}
                            type="text"
                            id="age"
                            name="age"
                            placeholder="Ej. 6 meses, 2 años, Adulto"
                            className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm
                             focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                        />
                    </div>

                    <div>
                        <label htmlFor="breed" className="block text-sm font-medium text-gray-700 mb-1">Raza (Opcional)</label>
                        <input
                            onChange={(e: ChangeEvent<HTMLInputElement>) => { setFormData({ ...formData, [e.target.name]: e.target.value }) }}
                            value={formData.breed}
                            type="text"
                            id="breed"
                            name="breed"
                            placeholder="Ej. Siames, Persa, Cruce Común"
                            className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm
                             focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                        />
                    </div>

                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Descripción del Michi</label>
                        <textarea
                            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => { setFormData({ ...formData, [e.target.name]: e.target.value }) }}
                            value={formData.description}
                            id="description"
                            name="description"
                            rows={4}
                            placeholder="Cuéntanos más sobre este michi: su personalidad, historia, características especiales, etc."
                            className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm
                             focus:ring-orange-500 focus:border-orange-500 sm:text-sm resize-y"
                            required
                        ></textarea>
                    </div>

                    <div>
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">Ciudad</label>
                        <input
                            onChange={(e: ChangeEvent<HTMLInputElement>) => { setFormData({ ...formData, [e.target.name]: e.target.value }) }}
                            value={formData.city}
                            type="text"
                            id="city"
                            name="city"
                            placeholder="Ej. San Nicolás de los Arroyos"
                            className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm
                             focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="province" className="block text-sm font-medium text-gray-700 mb-1">Provincia</label>
                        <select
                            onChange={(e: ChangeEvent<HTMLSelectElement>) => { setFormData({ ...formData, [e.target.name]: e.target.value }) }}
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
                        <label htmlFor="photo" className="block text-sm font-medium text-gray-700 mb-1">Foto del Michi</label>
                        {existingPhotoUrl && (
                            <div className="mt-2 mb-4">
                                <p className="text-xs text-gray-500 mb-1">Foto actual:</p>
                                <img src={existingPhotoUrl} alt="Foto actual" className="w-32 h-32 object-cover rounded-md" />
                            </div>
                        )}
                        <input
                            onChange={(e) => {
                                const file = e.target.files?.[0] || null;
                                setFormData({ ...formData, photo: file });
                            }}
                            type="file"
                            id="photo"
                            name="photo"
                            accept="image/*"
                            className="block w-full text-sm text-gray-500
                             file:mr-4 file:py-2 file:px-4
                             file:rounded-md file:border-0
                             file:text-sm file:font-semibold
                             file:bg-orange-50 file:text-orange-700
                             hover:file:bg-orange-100"
                            required
                        />
                        <p className="mt-1 text-xs text-gray-500">Deja vacío si no quieres cambiar la foto.</p>
                    </div>

                    <input type="hidden" name="userId" value="ID_DEL_USUARIO_ACTUAL" />
                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex justify-center py-2 px-4 border border-transparent
                             rounded-md shadow-sm text-sm font-medium text-white
                             bg-orange-500 hover:bg-orange-600 focus:outline-none
                             focus:ring-2 focus:ring-offset-2 focus:ring-orange-500
                             transition duration-300"
                        >
                            {loading ? 'Guardando...' : 'Guardar Cambios'}
                        </button>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default CatPostToEdit