import type { FC } from 'react';
import cls from './mainPage.module.css';
import { TaskWidget } from 'widgets/taskWidget';

const MainPage: FC = () => {
  return (
    <div className={cls['main-page']}>
      <h1>Мои задачи</h1>
      <TaskWidget />
    </div>
  );
};

export default MainPage;
