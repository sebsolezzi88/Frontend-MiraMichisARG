import axios from "axios";
import type { ApiCommentResponse } from "../types/types";

const URL:string = import.meta.env.VITE_API_URL;

//Obtener tanto el catpost como sus comentarios
export const getCatPosAndCommentstById = async (id:string) =>{
    
    try {
        if(!id){
            throw new Error("El id del catpost es requerido")
        }
       
        const res = await axios.get<ApiCommentResponse>(`${URL}/catpost/${id}/comments`);
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