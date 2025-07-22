// src/store/useAuthStore.ts
import {create} from 'zustand';
import {type UserData} from '../types/types';

export interface AuthState {
    user: UserData | null;
    token: string | null;
    isAuthenticated: boolean;
    isAuthLoading: boolean; 
    login: (userData: UserData) => void;
    logout: () => void;
    initializeAuth: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
    user: null,
    token: null,
    isAuthenticated: false,
    isAuthLoading: true, 

    login: (userData) => {
        set({
            user: userData,
            token: userData.token,
            isAuthenticated: true,
            isAuthLoading: false, // Ya no estamos cargando después del login
        });
    },

    logout: () => {
        set({
            user: null,
            token: null,
            isAuthenticated: false,
            isAuthLoading: false, // Ya no estamos cargando después del logout
        });
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
    },

    initializeAuth: () => {
        const storedToken = localStorage.getItem('authToken');
        const storedUserData = localStorage.getItem('userData');
        const currentAuthState = get();

        let newUser: UserData | null = null;
        let newIsAuthenticated = false;
        let newToken: string | null = null;

        if (storedToken && storedUserData) {
            try {
                const parsedUser = JSON.parse(storedUserData) as UserData;
                newUser = parsedUser;
                newToken = storedToken;
                newIsAuthenticated = true;
            } catch (e) {
                console.error("Error al parsear los datos de usuario guardados:", e);
                // Si hay un error, el estado deseado es deslogueado
            }
        }
        
        // Comparamos el estado deseado con el estado actual
        // Solo llamamos a set() si hay un cambio real en user, token o isAuthenticated
        // O si isAuthLoading aún es true (para cambiarlo a false al final)
        if (
            currentAuthState.user?.username !== newUser?.username || 
            currentAuthState.token !== newToken ||
            currentAuthState.isAuthenticated !== newIsAuthenticated ||
            currentAuthState.isAuthLoading === true // <-- Si aún está cargando, necesitamos actualizar
        ) {
            set({
                user: newUser,
                token: newToken,
                isAuthenticated: newIsAuthenticated,
                isAuthLoading: false, // <-- Siempre FALSE al terminar la inicialización
            });
            // console.log("Estado de autenticación actualizado durante la inicialización.");
        } else {
            // console.log("El estado de autenticación ya está actualizado, no se necesita actualización.");
            // Si no hay cambios, solo asegúrate de que isAuthLoading sea false
            if (currentAuthState.isAuthLoading) {
                set({ isAuthLoading: false });
            }
        }
    },
}));