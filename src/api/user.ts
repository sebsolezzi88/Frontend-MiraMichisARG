import axios from "axios";
import type { RegisterData } from "../types/types";

const URL:string = import.meta.env.VITE_API_URL;

export const registerUser = async (registerData:RegisterData) =>{
    const res = await axios.post(`${URL}/user/register`, registerData);
    return res.data;
}