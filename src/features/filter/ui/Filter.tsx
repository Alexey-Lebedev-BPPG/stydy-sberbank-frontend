import { useState, type ChangeEvent, type FC } from 'react';
import cls from './filter.module.css';
import type { Filter } from '../model/types/types';

interface IFilterSelectProps {
  filter: Filter;
  setFilter: (filter: Filter) => void;
}

const options: { value: Filter; label: string }[] = [
  { value: 'all', label: 'Все' },
  { value: 'completed', label: 'Активные' },
  { value: 'incomplete', label: 'Не активные' },
];

export const FilterSelect: FC<IFilterSelectProps> = props => {
  const { filter, setFilter } = props;

  const [localFilter, setLocalFilter] = useState<Filter>(filter);

  const handleFilterChange = (e: ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value !== localFilter) {
      setLocalFilter(e.target.value as Filter);
      setFilter(e.target.value as Filter);
    }
  };

  return (
    <div className={cls['filter']}>
      <label htmlFor='select'>Выберите фильтр</label>
      <select id='select' onChange={handleFilterChange} value={localFilter}>
        <option value='' disabled selected>
          Выберите фильтр из списка
        </option>
        {options.map(item => (
          <option value={item.value} key={item.value}>
            {item.label}
          </option>
        ))}
      </select>
    </div>
  );
};
