import {create} from 'zustand';
import {type UserData} from '../types/types';

interface AuthState {
    user: UserData | null;
    token: string | null;
    login: (userData: UserData) => void;
    logout: () => void;
    initializeAuth: () => void; //Metodo para iniciar el estado al cargar la app
}

export const useAuthStore = create<AuthState>((set, get) => ({
    user: null,
    token: null,

    login: (userData) => {
        set({
            user: userData,
            token: userData.token, // El token viene dentro de UserData
        });
    },

    logout: () => {
        set({
            user: null,
            token: null,
        });
        // También limpiar localStorage al hacer logout
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
    },

    // Método para inicializar el estado desde localStorage al cargar la app
    initializeAuth: () => {
        const storedToken = localStorage.getItem('authToken');
        const storedUserData = localStorage.getItem('userData');

        if (storedToken && storedUserData) {
            try {
                const user = JSON.parse(storedUserData) as UserData;
                // Opcional: Podrías querer validar el token con el backend aquí
                // antes de establecer el estado de autenticado.
                set({
                    user: user,
                    token: storedToken,
                });
            } catch (e) {
                console.error("Error parsing stored user data:", e);
                get().logout(); // Limpiar si hay un error en los datos guardados
            }
        } else {
            get().logout(); // Asegurarse de que el estado esté limpio si no hay datos
        }
    },
}));