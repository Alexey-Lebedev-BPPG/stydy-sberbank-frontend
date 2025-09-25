import { type FC, memo } from 'react';
import cls from './taskCard.module.css';
import type { Task } from '../model/types';
import { FilterButton } from 'shared/ui/filterButton/FilterButton';

interface ITaskCardProps extends Task {
  action: (id: string) => void;
  className?: string;
}

export const TaskCard: FC<ITaskCardProps> = memo(props => {
  const { className, completed, title, id, action } = props;

  const currentStatus = completed ? 'completed' : 'incomplete';

  const currentColor = completed ? 'green' : 'red';

  const handleRemove = () => action(id);
  return (
    <div className={`${cls['task-card']} ${className}`}>
      <div className={cls['task-card-content']}>
        <h1>{title}</h1>
        <span>{currentStatus}</span>
        <div className={`${cls.dot} ${cls[currentColor]}`} />
      </div>
      <FilterButton onClick={handleRemove}>Delete</FilterButton>
    </div>
  );
});
