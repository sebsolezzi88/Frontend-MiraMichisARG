import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRouteAdmin: React.FC<ProtectedRouteProps> = ({ children }) => {
  console.log('protector de ruta'); 

  // Consume el estado del contexto de autenticación
  const { isAuthenticated, isAuthLoading,user } = useAuth(); // <-- Uso del hook useAuth

  // 1. Si la autenticación aún está cargando, muestra un mensaje o spinner
  if (isAuthLoading) {
    console.log("ProtectedRoute: Autenticación cargando...");
    return <div>Cargando autenticación...</div>; 
  }

  // 2. Si la autenticación ha terminado de cargar Y el usuario NO está autenticado o no es admin
  if (!isAuthenticated) {
    console.log("ProtectedRoute: No autenticado ");
    return <Navigate to="/" replace />; 
  }
  if( user?.role !=='admin'){
    console.log("ProtectedRoute: Sin permisos de Administrador ");
    return <Navigate to="/" replace />; 
  }

  // 3. Si está autenticado y no está cargando, renderiza los componentes hijos
  return <>{children}</>;
};

export default ProtectedRouteAdmin;