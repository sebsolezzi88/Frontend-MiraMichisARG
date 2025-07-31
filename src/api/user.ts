import axios from "axios";
import type { ApiEditProfileResponse, ApiResponse, LoginApiResponse, LoginFormData, ProfileFormData, RegisterData, ResetPasswordFormData, ResetPasswordFormDataWithToken } from "../types/types";

const URL:string = import.meta.env.VITE_API_URL;

export const registerUser = async (registerData:RegisterData) =>{
    const res = await axios.post<ApiResponse>(`${URL}/user/register`, registerData);
    return res.data;
}

export const loginUser = async (loginData:LoginFormData) =>{
    const res = await axios.post<LoginApiResponse>(`${URL}/user/login`, loginData);
    return res.data;
}

export const editProfile = async(profileData:ProfileFormData)=>{
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
        
        const res = await axios.put<ApiEditProfileResponse>(
            `${URL}/user/profile`, 
            profileData, // Los datos de tu formulario de editar
            { headers } 
        );
        
        return res.data;

    } catch (error) {
        // Manejo de errores (por ejemplo, token inválido, servidor caído, etc.)
        if (axios.isAxiosError(error)) {
            console.error("Error al actualizar el perfil:", error.response?.data || error.message);
            throw new Error(error.response?.data?.message || "Error desconocido al actualizar el perfil.");
        } else {
            console.error("Error inesperado:", error);
            throw new Error("Ocurrió un error inesperado.");
        }
    }
}

export const activateUserAccount = async (token:string)=>{
    const res = await axios.get(`${URL}/user/activate?token=${token}`);
    return res.data;
}

export const generateNewToken = async(formData: ResetPasswordFormData)=>{
    const res = await axios.post<ApiResponse>(`${URL}/user/generate`,formData);
    return res.data;
}
export const resetPassword = async(formData: ResetPasswordFormDataWithToken)=>{
    const res = await axios.post<ApiResponse>(`${URL}/user/updatepassword`,formData);
    return res.data;
}