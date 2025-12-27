import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { ReactNode } from 'react';

interface AdminRouteProps {
  children: ReactNode;
}

export default function AdminRoute({ children }: AdminRouteProps) {
  const { user, isAuthenticated } = useAuth();

  console.log('AdminRoute - User:', user);
  console.log('AdminRoute - isAuthenticated:', isAuthenticated);
  console.log('AdminRoute - User role:', user?.role);

  // Show loading while checking auth
  if (isAuthenticated === undefined) {
    return (
      <div className="min-h-screen bg-light-bg dark:bg-dark-bg flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Checking access...</p>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (! isAuthenticated) {
    console.log('Not authenticated, redirecting to login');
    return <Navigate to="/login" replace />;
  }

  // Redirect to dashboard if not admin
  if (user?.role !== 'admin') {
    console.log('Not admin, redirecting to dashboard.  Current role:', user?.role);
    return <Navigate to="/dashboard" replace />;
  }

  console.log('Admin access granted! ');
  // Render children if admin
  return <>{children}</>;
}