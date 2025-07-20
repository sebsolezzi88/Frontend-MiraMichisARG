import axios from "axios";
import type { ApiResponse, LoginApiResponse, LoginFormData, RegisterData } from "../types/types";

const URL:string = import.meta.env.VITE_API_URL;

export const registerUser = async (registerData:RegisterData) =>{
    const res = await axios.post<ApiResponse>(`${URL}/user/register`, registerData);
    return res.data;
}

export const loginUser = async (loginData:LoginFormData) =>{
    const res = await axios.post<LoginApiResponse>(`${URL}/user/login`, loginData);
    return res.data;
}