import { useState, type ChangeEvent, type FC, type FormEvent } from 'react';
import { Navigate } from 'react-router';
import { useAuth } from 'shared/lib/contexts/AuthContext/useAuth';
import { Button, Description, Field, Input, Label } from '@headlessui/react';
import cls from './loginPage.module.css';

const LoginPage: FC = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login, token, isLoading: authLoading } = useAuth();

  if (token && !authLoading) return <Navigate to='/profile' replace />;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (error) setError('');
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.email.trim() || !formData.password) {
      setError('Все поля обязательны для заполнения');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Введите корректный email адрес');
      return;
    }

    setIsSubmitting(true);

    try {
      await login(formData.email, formData.password);
    } catch (err: any) {
      console.error('Ошибка входа:', err);
      setError(
        err.message || 'Произошла ошибка при входе. Проверьте email и пароль.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (authLoading) {
    return (
      <div className={cls.loading}>
        <div>Проверка авторизации...</div>
        <div>Загрузка...</div>
      </div>
    );
  }

  return (
    <div className={cls['login-page']}>
      <h1>Вход в систему</h1>
      <form onSubmit={handleSubmit}>
        <div className={cls.block}>
          <Field>
            <Label className={cls.label}>Email:</Label>
            <Input
              id='email'
              name='email'
              type='email'
              value={formData.email}
              onChange={handleChange}
              disabled={isSubmitting}
              placeholder='Введите ваш email'
              required
              className={cls['input']}
            />
          </Field>
        </div>
        <div className={cls.block}>
          <Field>
            <Label className={cls.label}>Пароль:</Label>
            <Input
              id='password'
              name='password'
              type='password'
              value={formData.password}
              onChange={handleChange}
              disabled={isSubmitting}
              placeholder='Введите ваш пароль'
              required
              className={cls['input']}
            />
          </Field>
        </div>
        {error && <Description className={cls.error}>{error}</Description>}
        <Button
          className={cls.button}
          type='submit'
          style={{
            backgroundColor: isSubmitting ? '#6c757d' : '#007bff',
            cursor: isSubmitting ? 'not-allowed' : 'pointer',
          }}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Вход...' : 'Войти'}
        </Button>
      </form>
      <div className={cls.data}>
        <p>Тестовые данные для входа:</p>
        <div>
          Email: admin@gmail.com
          <br />
          Пароль: administrator
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
