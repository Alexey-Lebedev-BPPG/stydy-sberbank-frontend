import { type FC, memo } from 'react';
import cls from './taskCard.module.css';
import type { Task } from '../model/types';
import { FilterButton } from 'shared/ui/filterButton/FilterButton';
import { EditTask } from 'features/editTask';

interface ITaskCardProps extends Task {
  action: (id: string) => void;
  editTask: (newTask: Task) => void;
  className?: string;
}

export const TaskCard: FC<ITaskCardProps> = memo(props => {
  const { className, action, editTask, ...currentTask } = props;

  const { completed, title, id } = currentTask;

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
      <div className={cls['task-card-content']}>
        <FilterButton onClick={handleRemove}>Delete</FilterButton>
        <EditTask editTask={editTask} task={currentTask} />
      </div>
    </div>
  );
});
