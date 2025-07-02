import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { LoaderCircle } from 'lucide-react';

const ProtectedRoute = ({ allowedRoles }) => {
  const { user, tokens, loading } = useAuth();

  if (loading) {
    
    return (
      <div className="h-screen w-full flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <LoaderCircle className="h-12 w-12 animate-spin text-blue-500" />
      </div>
    );
  }


  if (!tokens || !user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    toast.error("You do not have permission to access this page.");
    
    const homePath = 
      user.role === 'admin' ? '/admin/dashboard' :
      user.role === 'doctor' ? '/doctor/dashboard' :
      '/patient/dashboard';
      
    return <Navigate to={homePath} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;