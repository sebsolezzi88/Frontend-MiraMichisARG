import axios from "axios";
import type { ApiCatPostResponse, CatPostFormData } from "../types/types";
const URL:string = import.meta.env.VITE_API_URL;



export const addCatPost = async (registerData:CatPostFormData) =>{
    const authToken = localStorage.getItem('authToken');

     if (!authToken) {
        console.error("No hay token de autenticación disponible. El usuario no está logueado.");
        throw new Error("No autenticado."); 
    }

     const headers = {
        'Content-Type': 'multipart/form-data', 
        'Authorization': `Bearer ${authToken}` 
    };

    try {
        // 4. Realizar la solicitud POST con axios, incluyendo los headers
        // El primer argumento es la URL, el segundo son los datos, el tercero es el objeto de configuración.
        const res = await axios.post<ApiCatPostResponse>(
            `${URL}/catpost`, 
            registerData, // Los datos de tu formulario CatPostFormData
            { headers } // Pasa el objeto de headers aquí
        );
        
        return res.data;

    } catch (error) {
        // Manejo de errores (por ejemplo, token inválido, servidor caído, etc.)
        if (axios.isAxiosError(error)) {
            console.error("Error al crear la publicación del gato:", error.response?.data || error.message);
            throw new Error(error.response?.data?.message || "Error desconocido al crear la publicación.");
        } else {
            console.error("Error inesperado:", error);
            throw new Error("Ocurrió un error inesperado.");
        }
    }
}
