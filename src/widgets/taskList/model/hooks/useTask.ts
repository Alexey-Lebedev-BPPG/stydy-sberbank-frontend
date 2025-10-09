import {
  useGetTasksQuery,
  type CreateServerTask,
  type ITaskServer,
} from 'entities/task';
import { useCallback, useEffect, useMemo, useState } from 'react';
import type { Filter } from 'features/filter';

export const useTasks = () => {
  const { data: serverTasks = [] } = useGetTasksQuery();

  const [tasks, setTasks] = useState<ITaskServer[]>([]);

  const [localFilter, setLocalFilter] = useState<Filter>('all');

  const setFilter = (filter: Filter) => {
    setLocalFilter(filter);
  };

  const removeTask = useCallback(
    (idTask: number) => {
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

  const addTask = useCallback(
    (newTask: CreateServerTask) =>
      setTasks(prev => [...prev, { ...newTask, id: prev.length + 1 }]),
    [],
  );

  const editTask = useCallback(
    (newTask: ITaskServer) => {
      const currentTask = tasks.findIndex(item => item.id === newTask.id);

      if (currentTask >= 0) {
        const newArr = [...tasks];
        newArr[currentTask] = newTask;
        setTasks(newArr);
      }
    },
    [tasks],
  );

  useEffect(() => {
    if (tasks.length < 1) setTasks(serverTasks);
  }, [tasks]);

  return {
    tasks: filteredTasks,
    filter: localFilter,
    setFilter,
    removeTask,
    addTask,
    editTask,
  };
};
