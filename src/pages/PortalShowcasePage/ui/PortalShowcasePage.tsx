import { useState, type FC } from 'react';
import { Tooltip } from 'shared/ui/Tooltip/Tooltip';
import { TooltipPosition } from 'shared/ui/Tooltip/TooltipPosition';
import { ConfirmDialog } from 'shared/ui/ConfirmDialog/ConfirmDialog';
import { useConfirmDialog } from 'shared/ui/ConfirmDialog/useConfirmDialog';
import styles from './PortalShowcasePage.module.css';
import { useTheme } from 'shared/lib/contexts/ThemeContext/ThemeContext';

export const PortalShowcasePage: FC = () => {
  const [items, setItems] = useState(['Элемент 1', 'Элемент 2', 'Элемент 3']);
  const { theme, toggleTheme } = useTheme();

  const { isOpen, options, showConfirmDialog, handleConfirm, handleCancel } =
    useConfirmDialog();

  const handleDelete = async (index: number) => {
    const confirmed = await showConfirmDialog({
      title: 'Удалить элемент?',
      description: `Вы уверены, что хотите удалить "${items[index]}"?`,
    });

    if (confirmed) {
      setItems(prev => prev.filter((_, i) => i !== index));
    }
  };

  const handleParentClick = () =>
    console.log('Родительский элемент был кликнут');

  return (
    <div className={`${styles.container} ${styles[theme]}`}>
      <div className={styles.header}>
        <h1>Демонстрация порталов</h1>
        <button className={styles.themeToggle} onClick={toggleTheme}>
          Переключить тему ({theme === 'light' ? '🌙' : '☀️'})
        </button>
      </div>
      <div className={styles.section} onClick={handleParentClick}>
        <h2>Tooltip демонстрация</h2>
        <p>Кликните здесь - событие всплывает к родителю</p>
        <div className={styles.tooltipDemo}>
          <Tooltip content='Подсказка сверху' position={TooltipPosition.TOP}>
            <button className={styles.demoButton}>Сверху</button>
          </Tooltip>
          <Tooltip content='Подсказка снизу' position={TooltipPosition.BOTTOM}>
            <button className={styles.demoButton}>Снизу</button>
          </Tooltip>
          <Tooltip content='Подсказка слева' position={TooltipPosition.LEFT}>
            <button className={styles.demoButton}>Слева</button>
          </Tooltip>
          <Tooltip content='Подсказка справа' position={TooltipPosition.RIGHT}>
            <button className={styles.demoButton}>Справа</button>
          </Tooltip>
        </div>
      </div>
      <div className={styles.section}>
        <h2>ConfirmDialog демонстрация</h2>
        <div className={styles.itemsList}>
          {items.map((item, index) => (
            <div key={item} className={styles.item}>
              <span>{item}</span>
              <button
                className={styles.deleteButton}
                onClick={() => handleDelete(index)}
              >
                Удалить
              </button>
            </div>
          ))}
        </div>
      </div>
      <ConfirmDialog
        isOpen={isOpen}
        title={options.title}
        description={options.description}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </div>
  );
};
