import type { FC } from 'react';
import cls from './actionStatePage.module.css';
import { ActionStateForm } from 'widgets/ActionStateForm';
import { useNavigate } from 'react-router';
import { Button } from '@headlessui/react';

const ActionStatePage: FC = () => {
  const navigate = useNavigate();

  return (
    <div className={cls['action-state-page']}>
      <div className={cls.block}>
        <h1>ActionState page</h1>
        <Button onClick={() => navigate('/registration_page')}>
          Go to Registration Page
        </Button>
      </div>
      <ActionStateForm />
    </div>
  );
};

export default ActionStatePage;
