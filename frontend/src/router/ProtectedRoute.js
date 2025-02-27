import { Navigate, Outlet } from 'react-router-dom';
import { useDemo } from '../context/DemoContext';

export const ProtectedRoute = () => {
  const { isDemo } = useDemo();
  const token = localStorage.getItem('token');

  if (!token && !isDemo) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};
