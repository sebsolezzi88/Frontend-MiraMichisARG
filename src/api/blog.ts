import axios from "axios";
import type {ApiBlogGetOneResponse, ApiBlogGetResponse, ApiBlogPostResponse, ApiResponse, BlogPostFormData, UserData} from "../types/types";

const URL: string = import.meta.env.VITE_API_URL;

export const addBlogPost = async (data: BlogPostFormData) => {
  const authToken = localStorage.getItem("authToken");

  if (!authToken) {
    console.error(
      "No hay token de autenticación disponible. El usuario no está logueado."
    );
    throw new Error("No autenticado.");
  }

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${authToken}`,
  };

  try {
    // El primer argumento es la URL, el segundo son los datos, el tercero es el objeto de configuración.
    const res = await axios.post<ApiBlogPostResponse>(
      `${URL}/blog`,
      JSON.stringify(data),
      { headers }
    );
    return res.data;
  } catch (error) {
    // Manejo de errores (por ejemplo, token inválido, servidor caído, etc.)
    if (axios.isAxiosError(error)) {
      console.error(
        "Error al crear post:",
        error.response?.data || error.message
      );
      throw new Error(
        error.response?.data?.message ||
          "Error desconocido al crear el post."
      );
    } else {
      console.error("Error inesperado:", error);
      throw new Error("Ocurrió un error inesperado.");
    }
  }
}

//actualizar una publicación de blog
export const updateBlogPost = async (idBlogPost:string, data: BlogPostFormData) => {
  const authToken = localStorage.getItem("authToken");

  if (!authToken) {
    console.error(
      "No hay token de autenticación disponible. El usuario no está logueado."
    );
    throw new Error("No autenticado.");
  }

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${authToken}`,
  };

  try {
    // El primer argumento es la URL, el segundo son los datos, el tercero es el objeto de configuración.
    const res = await axios.put<ApiBlogPostResponse>(
      `${URL}/blog/${idBlogPost}`,
      JSON.stringify(data),
      { headers }
    );
    return res.data;
  } catch (error) {
    // Manejo de errores (por ejemplo, token inválido, servidor caído, etc.)
    if (axios.isAxiosError(error)) {
      console.error(
        "Error al editar post:",
        error.response?.data || error.message
      );
      throw new Error(
        error.response?.data?.message ||
          "Error desconocido al editar el post."
      );
    } else {
      console.error("Error inesperado:", error);
      throw new Error("Ocurrió un error inesperado.");
    }
  }
}

//Obtener los blog post para el usuario admin logueado
export const getBlogPosts = async () =>{
    
    const data = localStorage.getItem('userData');
    const authToken = localStorage.getItem('authToken');

    if (!data) {
        console.error("No hay datos de usuario logueado.");
        throw new Error("No autenticado."); 
    }
    
    if (!authToken) {
      console.error("No hay token de autenticación disponible. El usuario no está logueado.");
      throw new Error("No autenticado."); 
    }
    const userData = JSON.parse(data) as UserData;

    const headers = {
        'Authorization': `Bearer ${authToken}` 
    };

    try {
        const res = await axios.get<ApiBlogGetResponse>(`${URL}/blog/user/${userData.userId}`,{headers});
        return res.data;

    } catch (error) {
       
        if (axios.isAxiosError(error)) {
            console.error("Error al obtener los blogPost", error.response?.data || error.message);
            throw new Error(error.response?.data?.message || "Error desconocido al obtener los blogPost.");
        } else {
            console.error("Error inesperado:", error);
            throw new Error("Ocurrió un error inesperado.");
        }
    }
}

//Obtener un solo blogpost por su id 

export const getBlogPostById = async (idBlogPost:string) =>{
    
    try {
        const res = await axios.get<ApiBlogGetOneResponse>(`${URL}/blog/${idBlogPost}`);
        return res.data;

    } catch (error) {
       
        if (axios.isAxiosError(error)) {
            console.error("Error al obtener  blogPost", error.response?.data || error.message);
            throw new Error(error.response?.data?.message || "Error desconocido al obtener blogPost.");
        } else {
            console.error("Error inesperado:", error);
            throw new Error("Ocurrió un error inesperado.");
        }
    }
}

//borrar blogpost por su id 
export const deleteBlogPost = async (idBlogPost:string) =>{
  const authToken = localStorage.getItem("authToken");

  if (!authToken) {
    console.error(
      "No hay token de autenticación disponible. El usuario no está logueado."
    );
    throw new Error("No autenticado.");
  }

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${authToken}`,
  };

  try {
        const res = await axios.delete<ApiResponse>(`${URL}/blog/${idBlogPost}`,{headers});
        return res.data;

    } catch (error) {
       
        if (axios.isAxiosError(error)) {
            console.error("Error al borrar blogPost", error.response?.data || error.message);
            throw new Error(error.response?.data?.message || "Error desconocido al borrar posteo.");
        } else {
            console.error("Error inesperado:", error);
            throw new Error("Ocurrió un error inesperado.");
        }
    }
}
