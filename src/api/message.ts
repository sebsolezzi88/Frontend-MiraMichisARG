import axios from "axios";
import type { ApiMessageGetResponse, ApiMessagePostResponse, PostCommentFormData } from "../types/types";


const URL:string = import.meta.env.VITE_API_URL;

/* Funcion para mandar un mensaje a un usuario */
export const sendMessage = async (data:PostCommentFormData) =>{
    const authToken = localStorage.getItem('authToken');

     if (!authToken) {
        console.error("No hay token de autenticación disponible. El usuario no está logueado.");
        throw new Error("No autenticado."); 
    }

     const headers = {
        'Content-Type': 'application/json', 
        'Authorization': `Bearer ${authToken}` 
    };

    try {
        
        const res = await axios.post<ApiMessagePostResponse>(
            `${URL}/message`, 
            data,
            { headers } 
        );
        
        return res.data;

    } catch (error) {
        // Manejo de errores (por ejemplo, token inválido, servidor caído, etc.)
        if (axios.isAxiosError(error)) {
            console.error("Error al enviar el mensaje:", error.response?.data || error.message);
            throw new Error(error.response?.data?.message || "Error desconocido al enviar el mensaje.");
        } else {
            console.error("Error inesperado:", error);
            throw new Error("Ocurrió un error inesperado.");
        }
    }
}

//Funcion para obtener los mensajes recibidos
export const getReceivedMessages = async () =>{
    const authToken = localStorage.getItem('authToken');

     if (!authToken) {
        console.error("No hay token de autenticación disponible. El usuario no está logueado.");
        throw new Error("No autenticado."); 
    }

     const headers = {
        'Content-Type': 'application/json', 
        'Authorization': `Bearer ${authToken}` 
    };

    try {
        
        const res = await axios.get<ApiMessageGetResponse>(
            `${URL}/message/inbox`, 
            { headers } 
        );
        
        return res.data;

    } catch (error) {
        // Manejo de errores (por ejemplo, token inválido, servidor caído, etc.)
        if (axios.isAxiosError(error)) {
            console.error("Error al obtener los mensajes recibidos:", error.response?.data || error.message);
            throw new Error(error.response?.data?.message || "Error desconocido al obtener los mensajes recibidos.");
        } else {
            console.error("Error inesperado:", error);
            throw new Error("Ocurrió un error inesperado.");
        }
    }
}