import type { FC } from 'react';
import cls from './taskList.module.css';
import { TaskCard, type Task } from 'entities/task';

interface ITaskList {
  removeTask: (idTask: string) => void;
  tasks?: Task[];
}

export const TaskList: FC<ITaskList> = props => {
  const { removeTask, tasks } = props;

  return (
    <div className={cls['task-list']}>
      {tasks?.map(task => (
        <TaskCard key={task.id} {...task} action={removeTask} />
      ))}
    </div>
  );
};
