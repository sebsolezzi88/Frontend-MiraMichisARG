import axios from "axios";
import type { ApiResponse, LoginApiResponse, LoginFormData, RegisterData, ResetPasswordFormData } from "../types/types";

const URL:string = import.meta.env.VITE_API_URL;

export const registerUser = async (registerData:RegisterData) =>{
    const res = await axios.post<ApiResponse>(`${URL}/user/register`, registerData);
    return res.data;
}

export const loginUser = async (loginData:LoginFormData) =>{
    const res = await axios.post<LoginApiResponse>(`${URL}/user/login`, loginData);
    return res.data;
}

export const activateUserAccount = async (token:string)=>{
    const res = await axios.get(`${URL}/user/activate?token=${token}`);
    return res.data;
}

export const generateNewToken = async(formData: ResetPasswordFormData)=>{
    const res = await axios.post<ApiResponse>(`${URL}/user/generate`,formData);
    return res.data;
}