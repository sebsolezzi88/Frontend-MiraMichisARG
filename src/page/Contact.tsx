
const Contact = () => {
    return (
        <div className="bg-amber-50 min-h-screen flex items-center justify-center p-4">

            <div className="max-w-xl w-full bg-white rounded-xl shadow-lg p-8 space-y-6">
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold text-gray-800 mb-2">
                        ¡Contáctanos!
                    </h2>
                    <p className="text-gray-600">
                        ¿Tienes alguna pregunta, sugerencia o necesitas ayuda? Envíanos un mensaje.
                    </p>
                </div>

                <form action="#" method="POST" className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Tu Nombre</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Tu Nombre Completo"
                            className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm
                           focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Tu Correo Electrónico</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="ejemplo@dominio.com"
                            className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm
                           focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Asunto</label>
                        <input
                            type="text"
                            id="subject"
                            name="subject"
                            placeholder="Asunto de tu mensaje"
                            className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm
                           focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Tu Mensaje</label>
                        <textarea
                            id="message"
                            name="message"
                            rows={6}
                            placeholder="Escribe aquí tu pregunta o comentario..."
                            className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm
                           focus:ring-orange-500 focus:border-orange-500 sm:text-sm resize-y"
                            required
                        ></textarea>
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
                            Enviar Mensaje
                        </button>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default Contact