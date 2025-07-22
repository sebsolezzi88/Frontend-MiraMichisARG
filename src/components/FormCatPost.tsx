

const FormCatPost = () => {
  return (
    

    <div className="max-w-2xl w-full bg-white rounded-xl shadow-lg p-8 space-y-6">
        <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-800 mb-2">
                ¡Publica a tu Michi!
            </h2>
            <p className="text-gray-600">
                Comparte la historia de un michi en adopción, encontrado o perdido.
            </p>
        </div>

        <form action="#" method="POST" encType="multipart/form-data" className="space-y-4">
            <div>
                <label htmlFor="typeOfPublication" className="block text-sm font-medium text-gray-700 mb-1">Tipo de Publicación</label>
                <select
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
                    id="gender"
                    name="gender"
                    className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm
                           focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                    required
                >
                    <option value="">Selecciona el género</option>
                    <option value="Macho">Macho</option>
                    <option value="Hembra">Hembra</option>
                    <option value="Desconocido">Desconocido</option>
                </select>
            </div>

            <div>
                <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">Edad (Opcional)</label>
                <input
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
                <label htmlFor="ciudad" className="block text-sm font-medium text-gray-700 mb-1">Ciudad</label>
                <input
                    type="text"
                    id="ciudad"
                    name="ciudad"
                    placeholder="Ej. San Nicolás de los Arroyos"
                    className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm
                           focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                    required
                />
            </div>

            <div>
                <label htmlFor="provincia" className="block text-sm font-medium text-gray-700 mb-1">Provincia</label>
                <select
                    id="provincia"
                    name="provincia"
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
                <label htmlFor="photo" className="block text-sm font-medium text-gray-700 mb-1">Sube una foto del Michi</label>
                <input
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
                <p className="mt-1 text-xs text-gray-500">Formato JPG, PNG, GIF. Máx. 5MB.</p>
            </div>
            
            <input type="hidden" name="userId" value="ID_DEL_USUARIO_ACTUAL"/> 
            <div>
                <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent
                           rounded-md shadow-sm text-sm font-medium text-white
                           bg-orange-500 hover:bg-orange-600 focus:outline-none
                           focus:ring-2 focus:ring-offset-2 focus:ring-orange-500
                           transition duration-300"
                >
                    Crear Publicación
                </button>
            </div>
        </form>
    </div>

   
  )
}

export default FormCatPost