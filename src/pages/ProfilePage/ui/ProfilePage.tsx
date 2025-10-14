import { type FC } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from 'shared/lib/contexts/AuthContext/useAuth';
import { Button } from '@headlessui/react';
import cls from './profilePage.module.css';

const InfoRow: FC<{ label: string; value: string }> = ({ label, value }) => (
  <div style={{ display: 'flex' }}>
    <p>{label}:</p>
    <p>{value}</p>
  </div>
);

const ProfilePage: FC = () => {
  const { user, token, logout, userLoading } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  const goToPublicPage = () => navigate('/public');

  if (userLoading) {
    return (
      <div className={cls.loading}>
        <p>Загрузка данных пользователя...</p>
        <p>Пожалуйста, подождите</p>
      </div>
    );
  }

  return (
    <div className={cls['profile-page']}>
      <div className={cls.content}>
        <h1>Профиль пользователя</h1>
        <div className={cls['button-block']}>
          <Button className={cls.button} onClick={goToPublicPage}>
            Public
          </Button>
          <Button className={cls.button} onClick={handleLogout}>
            Выйти
          </Button>
        </div>
      </div>
      {user ? (
        <div>
          <div className={cls['info-block']}>
            <h3>Основная информация</h3>
            <div>
              <InfoRow label='Имя пользователя' value={user.name} />
              <InfoRow label='Email' value={user.email} />
              <InfoRow label='О себе' value={user.about || 'Не указано'} />
            </div>
          </div>
          <div className={cls['token-block']}>
            <h4>Вы авторизованы</h4>
            <p>Токен: {token ? 'присутствует' : 'отсутствует'}</p>
          </div>
        </div>
      ) : (
        <div className={cls['error-block']}>
          <h3>Данные пользователя не загружены</h3>
          <p>Попробуйте обновить страницу или войти заново</p>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
