import axios from "axios";
import type { ApiResponse, RegisterData } from "../types/types";

const URL:string = import.meta.env.VITE_API_URL;

export const registerUser = async (registerData:RegisterData) =>{
    const res = await axios.post<ApiResponse>(`${URL}/user/register`, registerData);
    return res.data;
}