import type { Task } from 'entities/task';
import { useCallback, useMemo, useState } from 'react';
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
  };

  const removeTask = useCallback(
    (idTask: string) => {
      const newArr = tasks.filter(task => task.id !== idTask);
      setTasks(newArr);
    },
    [tasks],
  );

  const filteredTasks = useMemo(() => {
    if (localFilter === 'all') return tasks;
    if (localFilter === 'completed')
      return tasks.filter(task => task.completed);
    if (localFilter === 'incomplete')
      return tasks.filter(task => !task.completed);
  }, [tasks, localFilter]);

  return {
    tasks: filteredTasks,
    filter: localFilter,
    setFilter,
    removeTask,
  };
};
