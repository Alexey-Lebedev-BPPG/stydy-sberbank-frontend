import type { FC } from 'react';
import cls from './registrationPage.module.css';
import { RegistrationForm } from 'widgets/RegistrationForm';
import { Button } from '@headlessui/react';
import { useNavigate } from 'react-router';

const RegistrationPage: FC = () => {
  const navigate = useNavigate();

  return (
    <div className={cls['registration-page']}>
      <div className={cls.block}>
        <h1>Registration page</h1>
        <Button onClick={() => navigate('/action_state')}>
          Go to Action State Page
        </Button>
      </div>
      <RegistrationForm />
    </div>
  );
};

export default RegistrationPage;
