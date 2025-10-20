import { type FC } from 'react';
import { Navigate, Outlet } from 'react-router';
import { useAuth } from 'shared/lib/contexts/AuthContext/useAuth';

export const ProtectedRoute: FC = () => {
  const { token, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div>
        <div>Проверка авторизации...</div>
        <div>Загрузка...</div>
      </div>
    );
  }

  if (!token) return <Navigate to='/login' replace />;

  return <Outlet />;
};
