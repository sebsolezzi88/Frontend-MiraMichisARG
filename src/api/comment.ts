import axios from "axios";
import type {
  ApiCommentResponse,
  ApiPostCommentResponse,
  PostCommentFormData,
} from "../types/types";

const URL: string = import.meta.env.VITE_API_URL;

//Obtener tanto el catpost como sus comentarios
export const getCatPosAndCommentstById = async (id: string) => {
  try {
    if (!id) {
      throw new Error("El id del catpost es requerido");
    }

    const res = await axios.get<ApiCommentResponse>(
      `${URL}/catpost/${id}/comments`
    );
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Error al obtener el catPost",
        error.response?.data || error.message
      );
      throw new Error(
        error.response?.data?.message ||
          "Error desconocido al obtener el catPost."
      );
    } else {
      console.error("Error inesperado:", error);
      throw new Error("Ocurrió un error inesperado.");
    }
  }
};

export const addCommentToCatPost = async (
  commentFormData: PostCommentFormData,
  catPostId: string
) => {
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
    const res = await axios.post<ApiPostCommentResponse>(
      `${URL}/catpost/${catPostId}/comments`,
      JSON.stringify(commentFormData),
      { headers }
    );
    return res.data;
  } catch (error) {
    // Manejo de errores (por ejemplo, token inválido, servidor caído, etc.)
    if (axios.isAxiosError(error)) {
      console.error(
        "Error al crear comentario:",
        error.response?.data || error.message
      );
      throw new Error(
        error.response?.data?.message ||
          "Error desconocido al crear comentario."
      );
    } else {
      console.error("Error inesperado:", error);
      throw new Error("Ocurrió un error inesperado.");
    }
  }
};
