import type { FC } from 'react';
import cls from './taskWidget.module.css';
import { TaskList, useTasks } from 'widgets/taskList';
import { FilterSelect } from 'features/Filter';

interface ITaskWidgetProps {
  className?: string;
}

export const TaskWidget: FC<ITaskWidgetProps> = props => {
  const { className } = props;

  const { filter, removeTask, setFilter, tasks } = useTasks();

  const currentClassName = `${cls['task-widget']} ${className}`;

  return (
    <div className={currentClassName}>
      <FilterSelect filter={filter} setFilter={setFilter} />
      <TaskList removeTask={removeTask} tasks={tasks} />
    </div>
  );
};
