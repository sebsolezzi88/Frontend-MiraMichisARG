import { useEffect, useState, type FormEvent } from "react";
import type {
  Message,
  MessageFormData,
  MessageWithEmisorData,
} from "../types/types";
import { getReceivedMessages, markMessageAsRead, sendMessage } from "../api/message"; // Importamos la nueva función
import { toast } from "react-toastify";
import anonCat from "../assets/anoncat.png";
import ReactModal from "react-modal";
import { useAuth } from "../context/AuthContext";

const MessagePage = () => {
  //Estado para visualicación del modal con el formulario de mensajes
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  //Estado para el formulario de mensaje
  const [messageFormData, setMessageFormData] = useState<MessageFormData>({
    toUserId: "",
    fromUserId: "",
    text: "",
  });
  // Estado para mostrar a quién se le está respondiendo en el modal
  const [replyToUsername, setReplyToUsername] = useState<string>("");
  const { user, isAuthenticated } = useAuth(); //Obtencion de datos para responder mensajes

  const [messages, setMessages] = useState<MessageWithEmisorData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [filter, setFilter] = useState<"all" | "unread">("all"); // Nuevo estado para el filtro

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setLoading(true);
        const response = await getReceivedMessages();

        if (response.status === "success" && response.receivedMessages) {
          setMessages(response.receivedMessages);
        } else {
          toast.error("No se pudieron obtener los mensajes", {
            theme: "colored",
          });
          setError("No se pudieron obtener los mensajes");
        }
      } catch (error) {
        console.error("Error al obtener mensajes:", error);
        toast.error("Ocurrió un error al cargar los mensajes", {
          theme: "colored",
        });
        setError("Ocurrió un error al cargar los mensajes");
      } finally {
        setLoading(false);
      }
    };
    fetchMessages();
  }, []);

  /* Funcion para precargar el modal  */
  const handleReplyClick = (toUser: { _id: string; username: string }) => {
    if (!user || !isAuthenticated) {
      toast.error("Debes iniciar sesión para responder mensajes.", {
        theme: "colored",
      });
      return;
    }
    if (user.userId === toUser._id) {
      toast.info("No puedes responderte a ti mismo.", { theme: "colored" });
      return;
    }

    setMessageFormData({
      toUserId: toUser._id, // ID del usuario al que se le responde
      fromUserId: user.userId, // ID del usuario logueado
      text: "", // Limpiar texto de mensajes anteriores
    });
    setReplyToUsername(toUser.username);
    setIsFormModalOpen(true);
  };

  const closeFormModal = () => {
    setIsFormModalOpen(false);
    setReplyToUsername(""); // Limpiar el nombre al cerrar
    setMessageFormData({ toUserId: "", fromUserId: "", text: "" }); // Resetear formulario
  };

  /* Enviar mensaje */
  const handleSubmitMessage = async (e: FormEvent) => {
    e.preventDefault();

    if (!messageFormData.text.trim()) {
      toast.error("El mensaje no puede estar vacío.", { theme: "colored" });
      return;
    }

    try {
      const response = await sendMessage(messageFormData);
      if (response.status === "success") {
        toast.success("Mensaje enviado", { theme: "colored", autoClose: 3000 });
        
      } else {
        toast.error(response.message || "No se logró enviar el mensaje", {
          theme: "colored",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("Ocurrió un error al enviar el mensaje", {
        theme: "colored",
        autoClose: 3000,
      });
    } finally {
      closeFormModal(); // Siempre cierra el modal después de intentar enviar
    }
  };
  /* Marca mensaje como leido */
  const handleMarkAsRead = async (messageId: string) => {
    try {
      const response = await markMessageAsRead(messageId);
      if (response.status === "success") {
        // Actualizamos el estado del mensaje en el frontend
        setMessages((prevMessages) =>
          prevMessages.map((msg) =>
            msg._id === messageId ? { ...msg, read: true } : msg
          )
        );
        toast.success("Mensaje marcado como leído", {
          theme: "colored",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error("Error al marcar como leído:", error);
      toast.error("No se pudo marcar el mensaje como leído", {
        theme: "colored",
      });
    }
  };

  const formatSentAt = (dateString: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "short",
      hour: "numeric",
      minute: "numeric",
    };
    return new Date(dateString).toLocaleDateString("es-AR", options);
  };

  const filteredMessages = messages.filter((message) => {
    if (filter === "unread") {
      return !message.read;
    }
    return true;
  });

  if (loading)
    return (
      <p className="text-center mt-10 text-gray-600">Cargando mensajes...</p>
    );
  if (error)
    return (
      <p className="text-center mt-10 text-red-500 font-semibold">{error}</p>
    );

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-8 space-y-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Mensajes Recibidos
      </h1>

      {/* Contenedor de los botones de filtro */}
      <div className="flex justify-center mb-6 space-x-2">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 rounded-lg font-semibold transition-colors duration-200 
                               ${
                                 filter === "all"
                                   ? "bg-orange-500 text-white"
                                   : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                               }`}
        >
          Todos
        </button>
        <button
          onClick={() => setFilter("unread")}
          className={`px-4 py-2 rounded-lg font-semibold transition-colors duration-200 
                               ${
                                 filter === "unread"
                                   ? "bg-orange-500 text-white"
                                   : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                               }`}
        >
          No leídos
        </button>
      </div>

      {filteredMessages.length === 0 ? (
        <p className="text-center mt-10 text-gray-600">
          {filter === "unread"
            ? "No tienes mensajes sin leer."
            : "No tienes mensajes para mostrar."}
        </p>
      ) : (
        filteredMessages.map((message) => (
          <div
            key={message._id}
            className={`flex items-start space-x-4 p-4 rounded-lg shadow-sm transition-all duration-200 
                                   ${
                                     message.read
                                       ? "bg-gray-100 border-l-4 border-gray-300"
                                       : "bg-white border-l-4 border-orange-500"
                                   }`}
          >
            <img
              className="w-10 h-10 rounded-full object-cover"
              src={message.fromUserId.avatarUrl || anonCat}
              alt="Avatar del remitente"
            />
            <div className="flex-1">
              <div className="flex justify-between items-center mb-1">
                <p className="font-semibold text-gray-800">
                  {message.fromUserId.username}
                </p>
                <span className="text-xs text-gray-500">
                  {formatSentAt(message.sentAt)}
                </span>
              </div>
              <p
                className={`text-gray-700 ${
                  !message.read ? "font-medium" : ""
                }`}
              >
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
            <button
              onClick={() => handleReplyClick(message.fromUserId)} // <-- Botón Responder
              className="px-3 py-1 text-xs font-medium text-white bg-blue-500 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Responder
            </button>
          </div>
        ))
      )}
      {/* Modal de Respuesta */}
      <ReactModal
        isOpen={isFormModalOpen}
        onRequestClose={closeFormModal}
        contentLabel={`Responder a ${replyToUsername}`}
        className="bg-white p-8 rounded-xl shadow-lg max-w-lg mx-auto my-auto w-11/12 outline-none"
        overlayClassName="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
      >
        <div className="text-center">
          <h2 className="text-2xl font-extrabold text-gray-800 mb-2">
            Enviar Mensaje a{" "}
            <span className="text-orange-600">{replyToUsername}</span>
          </h2>
          <p className="text-gray-600">Escribe tu mensaje.</p>
        </div>

        <form onSubmit={handleSubmitMessage} className="space-y-4 mt-6">
          <div>
            <label
              htmlFor="messageText"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Tu Mensaje
            </label>
            <textarea
              onChange={(e) =>
                setMessageFormData({ ...messageFormData, text: e.target.value })
              }
              value={messageFormData.text}
              id="messageText" // ID único para este textarea
              name="text"
              rows={6}
              placeholder="Hola, te respondo sobre el michi..."
              className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm
                                       focus:ring-orange-500 focus:border-orange-500 sm:text-sm resize-y"
              required
            ></textarea>
            <p className="mt-1 text-xs text-gray-500">
              Sé claro y conciso para una mejor comunicación.
            </p>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button" // Cambiado a type="button" para no disparar el submit
              onClick={closeFormModal}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 font-semibold"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 font-semibold transition duration-300"
            >
              Enviar Mensaje
            </button>
          </div>
        </form>
      </ReactModal>
    </div>
  );
};

export default MessagePage;
