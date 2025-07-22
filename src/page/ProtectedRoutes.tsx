import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore'; // Tu store de Zustand

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, initializeAuth } = useAuthStore((state) => ({
    isAuthenticated: state.isAuthenticated,
    initializeAuth: state.initializeAuth,
  }));

  // Si no está autenticado, redirige a la página de login
  if (!isAuthenticated) {
    
    return <Navigate to="/login" replace />; // 'replace' evita que el usuario pueda volver con el botón "atrás"
  }

  // Si está autenticado, renderiza los componentes hijos (la ruta protegida)
  return <>{children}</>;
};

export default ProtectedRoute;
