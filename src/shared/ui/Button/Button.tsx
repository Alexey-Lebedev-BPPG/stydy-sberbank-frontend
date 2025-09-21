import type { FC, ReactNode } from 'react';
import cls from './button.module.css';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
}

export const Button: FC<ButtonProps> = props => {
  const { children, onClick } = props;

  return (
    <button onClick={onClick} className={cls.button}>
      {children}
    </button>
  );
};
