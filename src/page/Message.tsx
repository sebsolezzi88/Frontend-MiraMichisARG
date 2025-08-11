import { useEffect, useState } from "react";
import type { Message, MessageWithEmisorData, UserData } from "../types/types"; // Asumiendo que 'UserData' es la estructura del usuario

import { toast } from "react-toastify";
import anonCat from '../assets/anoncat.png'; // Un avatar por defecto
import { getReceivedMessages } from "../api/message";

const MessagePage = () => {
    const [messages, setMessages] = useState<MessageWithEmisorData[]>([]);
    const [loading, setLoading] = useState<boolean>(true); // Empezamos en 'true'
    const [error, setError] = useState<string>("");

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                setLoading(true); // Se inicia el estado de carga
                const response = await getReceivedMessages();
                
                if (response.status === "success" && response.receivedMessages) {
                    console.log(response.receivedMessages)
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
                setLoading(false); // La carga finaliza
            }
        };

        fetchMessages();
    }, []); // El useEffect se ejecuta una sola vez al montar el componente

    // Función para renderizar la fecha de forma amigable
    const formatSentAt = (dateString: Date) => {
        const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', hour: 'numeric', minute: 'numeric' };
        return new Date(dateString).toLocaleDateString('es-AR', options);
    };

    if (loading) return <p className="text-center mt-10 text-gray-600">Cargando mensajes...</p>;
    if (error) return <p className="text-center mt-10 text-red-500 font-semibold">{error}</p>;
    if (messages.length === 0) return <p className="text-center mt-10 text-gray-600">No tienes mensajes para mostrar.</p>;

    return (
        <div className="max-w-3xl mx-auto p-4 sm:p-8 space-y-4">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Mensajes Recibidos</h1>
            {messages.map((message) => (
                <div
                    key={message.sentAt.toString() + message.fromUserId}
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
                </div>
            ))}
        </div>
    );
};

export default MessagePage;