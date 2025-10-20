import { Link } from 'react-router';
import { useAuth } from 'shared/lib/contexts/AuthContext/useAuth';
import type { FC } from 'react';
import cls from './publicPage.module.css';

const PublicPage: FC = () => {
  const { token, user } = useAuth();

  return (
    <div className={cls['public-page']}>
      <h1>Публичная страница</h1>
      <div
        className={cls['status-block']}
        style={{
          backgroundColor: token ? '#d4edda' : '#f8d7da',
          border: token ? '1px solid #c3e6cb' : '1px solid #f5c6cb',
        }}
      >
        <h3 style={{ color: token ? '#155724' : '#721c24' }}>
          Статус авторизации: {token ? 'Вы авторизованы' : 'Вы не авторизованы'}
        </h3>
        {token && user ? (
          <>
            <p>Текущий пользователь: {user.name}</p>
            <p>Email: {user.email}</p>
          </>
        ) : (
          <p>Для доступа к защищенным страницам необходимо войти в систему.</p>
        )}
      </div>
      <div className={cls.links}>
        {token ? (
          <Link to='/profile' className={cls.link}>
            Перейти в профиль
          </Link>
        ) : (
          <Link to='/login' className={cls.link}>
            Войти в систему
          </Link>
        )}
      </div>
    </div>
  );
};

export default PublicPage;
