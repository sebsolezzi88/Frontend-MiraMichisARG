import React, { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { type UserData } from '../types/types'; 

interface AuthContextType {
    user: UserData | null;
    token: string | null;
    isAuthenticated: boolean;
    isAuthLoading: boolean; // Para manejar el estado de carga inicial
    login: (userData: UserData) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 3. Crear el componente Proveedor de Contexto
interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<UserData | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isAuthLoading, setIsAuthLoading] = useState<boolean>(true); // Inicialmente cargando

    // Lógica para iniciar sesión
    const login = useCallback((userData: UserData) => {
        setUser(userData);
        setToken(userData.token);
        setIsAuthenticated(true);
        setIsAuthLoading(false); // Terminó la carga después del login
        localStorage.setItem('authToken', userData.token);
        localStorage.setItem('userData', JSON.stringify(userData));
    }, []);

    // Lógica para cerrar sesión
    const logout = useCallback(() => {
        setUser(null);
        setToken(null);
        setIsAuthenticated(false);
        setIsAuthLoading(false); // Terminó la carga después del logout
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
    }, []);

    // Lógica para inicializar el estado de autenticación desde localStorage
    useEffect(() => {
        const storedToken = localStorage.getItem('authToken');
        const storedUserData = localStorage.getItem('userData');

        if (storedToken && storedUserData) {
            try {
                const parsedUser = JSON.parse(storedUserData) as UserData;
                setUser(parsedUser);
                setToken(storedToken);
                setIsAuthenticated(true);
            } catch (e) {
                console.error("Error al parsear datos de usuario desde localStorage:", e);
                // Si hay un error, limpiar cualquier dato corrupto
                localStorage.removeItem('authToken');
                localStorage.removeItem('userData');
                setIsAuthenticated(false);
                setUser(null);
                setToken(null);
            }
        } else {
            setIsAuthenticated(false); // No hay datos de auth en localStorage
            setUser(null);
            setToken(null);
        }
        setIsAuthLoading(false); // <-- Siempre establece a false cuando la inicialización termina
    }, []); // Este efecto se ejecuta SOLO una vez al montar el proveedor

    // 4. El valor que se proporcionará al contexto
    const contextValue =useMemo(() => ({
        user,
        token,
        isAuthenticated,
        isAuthLoading,
        login,
        logout,
    }), [user, token, isAuthenticated, isAuthLoading, login, logout]);

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
}

//Hook personalizado para consumir el contexto fácilmente
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth debe ser usado dentro de un AuthProvider');
    }
    return context;
};
