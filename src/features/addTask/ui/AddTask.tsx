import { type ChangeEvent, type FC, memo, useState } from 'react';
import { FilterButton } from 'shared/ui/filterButton/FilterButton';
import cls from './addTask.module.css';
import type { CreateTask } from 'entities/task';

interface IAddTaskProps {
  addTask: (newTask: CreateTask) => void;
}

export const AddTask: FC<IAddTaskProps> = memo(props => {
  const { addTask } = props;

  const [isOpenModalCreate, setIsOpenModalCreate] = useState(false);

  const [localTitle, setLocalTitle] = useState('');
  const [localStatus, setLocalStatus] = useState(false);
  const [isErrorAddTask, setIsErrorAddTask] = useState('');

  const handleOpenModal = () => setIsOpenModalCreate(true);
  const handleCloseModal = () => setIsOpenModalCreate(false);

  const currentAddTask = () => {
    if (isErrorAddTask.length === 0 && localTitle.length > 0) {
      addTask({ completed: localStatus, title: localTitle });
      handleCloseModal();
    } else {
      setIsErrorAddTask('Заполните все данные');
    }
  };

  const handleChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setLocalTitle(event.target.value);
    if (event.target.value.length > 0) {
      setIsErrorAddTask('');
    } else {
      setIsErrorAddTask('Не указан заголовок');
    }
  };

  const handleChangeStatus = (event: ChangeEvent<HTMLInputElement>) =>
    setLocalStatus(event.target.checked);

  return (
    <div className={cls['add-task']}>
      {!isOpenModalCreate && (
        <FilterButton onClick={handleOpenModal}>
          <span>Добавить задачу</span>
        </FilterButton>
      )}
      {isOpenModalCreate && (
        <div className={cls['add-task-block']}>
          <div className={cls['add-task-section']}>
            <label htmlFor='title'>Введите новый заголовок задачи</label>
            <input value={localTitle} onChange={handleChangeTitle} />
          </div>
          <div className={cls['add-task-section']}>
            <label htmlFor='completed'>Выберите статус задачи</label>
            <input
              type='checkbox'
              checked={localStatus}
              onChange={handleChangeStatus}
            />
          </div>
          {isErrorAddTask.length > 0 && (
            <h3 className={cls.error}>{isErrorAddTask}</h3>
          )}
          <div className={cls['add-task-section']}>
            <FilterButton onClick={handleCloseModal}>
              <span>Отменить</span>
            </FilterButton>
            <FilterButton onClick={currentAddTask}>
              <span>Создать задачу</span>
            </FilterButton>
          </div>
        </div>
      )}
    </div>
  );
});
