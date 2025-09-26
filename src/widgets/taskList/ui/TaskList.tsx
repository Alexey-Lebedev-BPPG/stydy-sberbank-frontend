import { memo, type FC } from 'react';
import cls from './taskList.module.css';
import { TaskCard, type Task } from 'entities/task';

interface ITaskList {
  removeTask: (idTask: string) => void;
  editTask: (newTask: Task) => void;
  tasks?: Task[];
}

export const TaskList: FC<ITaskList> = memo(props => {
  const { removeTask, tasks, editTask } = props;

  return (
    <div className={cls['task-list']}>
      {tasks?.map(task => (
        <TaskCard
          key={task.id}
          {...task}
          action={removeTask}
          editTask={editTask}
        />
      ))}
    </div>
  );
});
