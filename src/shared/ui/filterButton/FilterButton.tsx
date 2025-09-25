import type { FC, ReactNode } from 'react';
import cls from './filterButton.module.css';

interface FilterButtonProps {
  children: ReactNode;
  onClick?: () => void;
}

export const FilterButton: FC<FilterButtonProps> = props => {
  const { children, onClick } = props;

  return (
    <button onClick={onClick} className={cls.button}>
      {children}
    </button>
  );
};
