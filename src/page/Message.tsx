import { useEffect, useState } from "react";
import type { Message } from "../types/types";
import { getReceivedMessage } from "../api/message";

const MessagePage = () => {
  const [messages, setMessages] = useState<Message[]>([]); // Estado de los mensajes
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await getReceivedMessage(); // Llamamos a la api
        console.log(response);
        if (response.status === "success" && response.receivedMessages) {
          setMessages(response.receivedMessages);
        }
        fetchMessages(); //Buscamos los mensajes
      } catch (error) {
        setError("No se pudieron obtener los mensajes");
        console.error("Error al obtener mensajes no leídos:", error);
      } finally {
        setLoading(false);
      }
    };
  }, []);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;
  return <div>Message</div>;
};

export default MessagePage;
