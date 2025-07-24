import axios from "axios";
import type { ApiCatGetResponse, ApiCatPostResponse, ApiResponse, ApiSingleCatPostResponse, CatPostFormData, UserData } from "../types/types";
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

export const updateCatPost = async (id:string,formData:CatPostFormData) =>{
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
      
        const res = await axios.put<ApiResponse>(`${URL}/catpost/${id}`, formData, { headers } );
        
        return res.data;

    } catch (error) {
        // Manejo de errores (por ejemplo, token inválido, servidor caído, etc.)
        if (axios.isAxiosError(error)) {
            console.error("Error al editar la publicación del gato:", error.response?.data || error.message);
            throw new Error(error.response?.data?.message || "Error desconocido al editar la publicación.");
        } else {
            console.error("Error inesperado:", error);
            throw new Error("Ocurrió un error inesperado.");
        }
    }
}

export const getCatPosts = async () =>{
    
    const data = localStorage.getItem('userData');
    if (!data) {
        console.error("No hay datos de usuario logueado.");
        throw new Error("No autenticado."); 
    }
    const userData = JSON.parse(data) as UserData;

    try {
       
        const res = await axios.get<ApiCatGetResponse>(`${URL}/catpost/user/${userData.userId}`);
        return res.data;

    } catch (error) {
       
        if (axios.isAxiosError(error)) {
            console.error("Error al obtener los catPost", error.response?.data || error.message);
            throw new Error(error.response?.data?.message || "Error desconocido al obtener los catPost.");
        } else {
            console.error("Error inesperado:", error);
            throw new Error("Ocurrió un error inesperado.");
        }
    }
}

export const getCatPostById = async (id:string) =>{
    

    try {
       
        const res = await axios.get<ApiSingleCatPostResponse>(`${URL}/catpost/${id}`);
        return res.data;

    } catch (error) {
       
        if (axios.isAxiosError(error)) {
            console.error("Error al obtener el catPost", error.response?.data || error.message);
            throw new Error(error.response?.data?.message || "Error desconocido al obtener el catPost.");
        } else {
            console.error("Error inesperado:", error);
            throw new Error("Ocurrió un error inesperado.");
        }
    }
}

export const deleteCatPost = async (id:string) =>{

     const authToken = localStorage.getItem('authToken');

     if (!authToken) {
        console.error("No hay token de autenticación disponible. El usuario no está logueado.");
        throw new Error("No autenticado."); 
    }

     const headers = {
        'Content-Type': 'multipart/form-data', 
        'Authorization': `Bearer ${authToken}` 
    };
    
    
    if (!id) {
        console.error("No hay id");
        throw new Error("Id not Found."); 
    }

    try {
       
        const res = await axios.delete<ApiResponse>(`${URL}/catpost/${id}`,{headers});
        return res.data;

    } catch (error) {
        
        if (axios.isAxiosError(error)) {
            console.error("Error al borrar catPost", error.response?.data || error.message);
            throw new Error(error.response?.data?.message || "Error desconocido al borrar catPost.");
        } else {
            console.error("Error inesperado:", error);
            throw new Error("Ocurrió un error inesperado.");
        }
    }
}

