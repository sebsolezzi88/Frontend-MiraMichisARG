import axios from "axios";
import type {ApiBlogPostResponse, BlogPostFormData} from "../types/types";

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
};
