import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router';
import { AuthProvider } from 'shared/lib/contexts/AuthContext/AuthContext';
import { ProtectedRoute } from './ProtectedRoute';
import type { FC } from 'react';
import { PublicPage } from 'pages/PublicPage';
import { ProfilePage } from 'pages/ProfilePage';
import { LoginPage } from 'pages/LoginPage';

export const AppRouter: FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path='/public' element={<PublicPage />} />
          <Route path='/login' element={<LoginPage />} />

          <Route element={<ProtectedRoute />}>
            <Route path='/profile' element={<ProfilePage />} />
          </Route>

          <Route path='/' element={<Navigate to='/public' replace />} />

          <Route
            path='*'
            element={
              <div style={{ padding: '40px', textAlign: 'center' }}>
                <h1>404 - Страница не найдена</h1>
                <p>Запрошенная страница не существует.</p>
                <a href='/public' style={{ color: '#007bff' }}>
                  Вернуться на публичную страницу
                </a>
              </div>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};
