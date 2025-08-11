import { useEffect, useState } from "react";
import type { Message, MessageWithEmisorData } from "../types/types";
import { getReceivedMessages, markMessageAsRead } from "../api/message"; // Importamos la nueva función
import { toast } from "react-toastify";
import anonCat from '../assets/anoncat.png';

const MessagePage = () => {
    const [messages, setMessages] = useState<MessageWithEmisorData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");
    const [filter, setFilter] = useState<'all' | 'unread'>('all'); // Nuevo estado para el filtro

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                setLoading(true);
                const response = await getReceivedMessages();
                
                if (response.status === "success" && response.receivedMessages) {
                    setMessages(response.receivedMessages);
                } else {
                    toast.error("No se pudieron obtener los mensajes", { theme: "colored" });
                    setError("No se pudieron obtener los mensajes");
                }
            } catch (error) {
                console.error("Error al obtener mensajes:", error);
                toast.error("Ocurrió un error al cargar los mensajes", { theme: "colored" });
                setError("Ocurrió un error al cargar los mensajes");
            } finally {
                setLoading(false);
            }
        };
        fetchMessages();
    }, []);

    const handleMarkAsRead = async (messageId: string) => {
        try {
            const response = await markMessageAsRead(messageId);
            if (response.status === 'success') {
                // Actualizamos el estado del mensaje en el frontend
                setMessages(prevMessages => 
                    prevMessages.map(msg => 
                        msg._id === messageId ? { ...msg, read: true } : msg
                    )
                );
                toast.success('Mensaje marcado como leído', { theme: "colored", autoClose: 3000 });
            }
        } catch (error) {
            console.error("Error al marcar como leído:", error);
            toast.error('No se pudo marcar el mensaje como leído', { theme: "colored" });
        }
    };

    const formatSentAt = (dateString: Date) => {
        const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', hour: 'numeric', minute: 'numeric' };
        return new Date(dateString).toLocaleDateString('es-AR', options);
    };

    const filteredMessages = messages.filter(message => {
        if (filter === 'unread') {
            return !message.read;
        }
        return true;
    });

    if (loading) return <p className="text-center mt-10 text-gray-600">Cargando mensajes...</p>;
    if (error) return <p className="text-center mt-10 text-red-500 font-semibold">{error}</p>;

    return (
        <div className="max-w-3xl mx-auto p-4 sm:p-8 space-y-4">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Mensajes Recibidos</h1>

            {/* Contenedor de los botones de filtro */}
            <div className="flex justify-center mb-6 space-x-2">
                <button
                    onClick={() => setFilter('all')}
                    className={`px-4 py-2 rounded-lg font-semibold transition-colors duration-200 
                               ${filter === 'all' ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                >
                    Todos
                </button>
                <button
                    onClick={() => setFilter('unread')}
                    className={`px-4 py-2 rounded-lg font-semibold transition-colors duration-200 
                               ${filter === 'unread' ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                >
                    No leídos
                </button>
            </div>

            {filteredMessages.length === 0 ? (
                <p className="text-center mt-10 text-gray-600">
                    {filter === 'unread' ? 'No tienes mensajes sin leer.' : 'No tienes mensajes para mostrar.'}
                </p>
            ) : (
                filteredMessages.map((message) => (
                    <div
                        key={message._id}
                        className={`flex items-start space-x-4 p-4 rounded-lg shadow-sm transition-all duration-200 
                                   ${message.read ? 'bg-gray-100 border-l-4 border-gray-300' : 'bg-white border-l-4 border-orange-500'}`}
                    >
                        <img
                            className="w-10 h-10 rounded-full object-cover"
                            src={message.fromUserId.avatarUrl || anonCat}
                            alt="Avatar del remitente"
                        />
                        <div className="flex-1">
                            <div className="flex justify-between items-center mb-1">
                                <p className="font-semibold text-gray-800">{message.fromUserId.username}</p>
                                <span className="text-xs text-gray-500">{formatSentAt(message.sentAt)}</span>
                            </div>
                            <p className={`text-gray-700 ${!message.read ? 'font-medium' : ''}`}>
                                {message.text}
                            </p>
                        </div>
                        {!message.read && (
                            <button
                                onClick={() => handleMarkAsRead(message._id)}
                                className="ml-4 px-3 py-1 text-xs font-medium text-white bg-green-500 rounded-full hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                            >
                                Marcar como leído
                            </button>
                        )}
                    </div>
                ))
            )}
        </div>
    );
};

export default MessagePage;