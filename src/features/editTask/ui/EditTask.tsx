import { type ChangeEvent, type FC, memo, useState } from 'react';
import cls from './editTask.module.css';
import type { ITaskServer } from 'entities/task';
import { FilterButton } from 'shared/ui/filterButton/FilterButton';

interface IEditTaskProps {
  editTask: (newTask: ITaskServer) => void;
  task: ITaskServer;
}

export const EditTask: FC<IEditTaskProps> = memo(props => {
  const { editTask, task } = props;

  const [isOpenModalEdit, setIsOpenModalEdit] = useState(false);

  const [localTitle, setLocalTitle] = useState(task.title);
  const [localStatus, setLocalStatus] = useState(task.completed);
  const [isErrorEditTask, setIsErrorEditTask] = useState('');

  const handleOpenModal = () => setIsOpenModalEdit(true);
  const handleCloseModal = () => setIsOpenModalEdit(false);

  const currentAddTask = () => {
    if (isErrorEditTask.length === 0 && localTitle.length > 0) {
      editTask({
        id: task.id,
        completed: localStatus,
        title: localTitle,
        userId: task.userId,
      });
      handleCloseModal();
    } else {
      setIsErrorEditTask('Заполните все данные');
    }
  };

  const handleChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setLocalTitle(event.target.value);
    if (event.target.value.length > 0) {
      setIsErrorEditTask('');
    } else {
      setIsErrorEditTask('Не указан заголовок');
    }
  };

  const handleChangeStatus = (event: ChangeEvent<HTMLInputElement>) =>
    setLocalStatus(event.target.checked);

  return (
    <div className={cls['edit-task']}>
      {!isOpenModalEdit && (
        <FilterButton onClick={handleOpenModal}>
          <span>Редактировать задачу</span>
        </FilterButton>
      )}
      {isOpenModalEdit && (
        <div className={cls['edit-task-block']}>
          <div className={cls['edit-task-section']}>
            <label htmlFor='title'>Введите новый заголовок задачи</label>
            <input value={localTitle} onChange={handleChangeTitle} />
          </div>
          <div className={cls['edit-task-section']}>
            <label htmlFor='completed'>Выберите статус задачи</label>
            <input
              type='checkbox'
              checked={localStatus}
              onChange={handleChangeStatus}
            />
          </div>
          {isErrorEditTask.length > 0 && (
            <h3 className={cls.error}>{isErrorEditTask}</h3>
          )}
          <div className={cls['edit-task-section']}>
            <FilterButton onClick={handleCloseModal}>
              <span>Отменить</span>
            </FilterButton>
            <FilterButton onClick={currentAddTask}>
              <span>Сохранить изменения</span>
            </FilterButton>
          </div>
        </div>
      )}
    </div>
  );
});
