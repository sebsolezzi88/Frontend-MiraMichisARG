import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  console.log('protector de ruta'); 

  // Consume el estado del contexto de autenticación
  const { isAuthenticated, isAuthLoading } = useAuth(); // <-- Uso del hook useAuth

  // 1. Si la autenticación aún está cargando, muestra un mensaje o spinner
  if (isAuthLoading) {
    console.log("ProtectedRoute: Autenticación cargando...");
    return <div>Cargando autenticación...</div>; 
  }

  // 2. Si la autenticación ha terminado de cargar Y el usuario NO está autenticado, redirige
  if (!isAuthenticated) {
    console.log("ProtectedRoute: No autenticado, redirigiendo a /login");
    return <Navigate to="/login" replace />; 
  }

  // 3. Si está autenticado y no está cargando, renderiza los componentes hijos
  return <>{children}</>;
};

export default ProtectedRoute;