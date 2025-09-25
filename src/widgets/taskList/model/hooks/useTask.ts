import type { Task } from 'entities/task';
import { useState } from 'react';
import type { Filter } from 'features/filter';

const initialTask: Task[] = [
  { id: '1', title: 'Alice', completed: true },
  { id: '2', title: 'Bob', completed: false },
  { id: '3', title: 'Charlie', completed: true },
  { id: '4', title: 'David', completed: false },
];

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTask);

  const [localFilter, setLocalFilter] = useState<Filter>('all');

  const setFilter = (filter: Filter) => {
    setLocalFilter(filter);
    if (filter === 'all') setTasks(initialTask);
    if (filter === 'completed')
      setTasks(initialTask.filter(task => task.completed));
    if (filter === 'incomplete')
      setTasks(initialTask.filter(task => !task.completed));
  };

  const removeTask = (idTask: string) => {
    const newArr = tasks.filter(task => task.id !== idTask);
    setTasks(newArr);
  };

  return {
    tasks,
    filter: localFilter,
    setFilter,
    removeTask,
  };
};
