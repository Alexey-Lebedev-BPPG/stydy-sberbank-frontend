import { useContext, type FC, type MouseEvent } from 'react';
import { createPortal } from 'react-dom';
import styles from './ConfirmDialog.module.css';
import { ThemeContext } from 'shared/lib/contexts/ThemeContext/ThemeContext';

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  description: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmDialog: FC<ConfirmDialogProps> = ({
  isOpen,
  title,
  description,
  onConfirm,
  onCancel,
}) => {
  const { theme } = useContext(ThemeContext);

  const handleOverlayClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onCancel();
  };

  const dialogRoot = document.getElementById('dialog-root');

  if (!dialogRoot || !isOpen) return null;

  return createPortal(
    <div
      className={`${styles.overlay} ${styles[theme]}`}
      onClick={handleOverlayClick}
    >
      <div className={styles.dialog}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>{description}</p>
        <div className={styles.actions}>
          <button className={styles.buttonCancel} onClick={onCancel}>
            Отмена
          </button>
          <button className={styles.buttonConfirm} onClick={onConfirm}>
            Подтвердить
          </button>
        </div>
      </div>
    </div>,
    dialogRoot,
  );
};
