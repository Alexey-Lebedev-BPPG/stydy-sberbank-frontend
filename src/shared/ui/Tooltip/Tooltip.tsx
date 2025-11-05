import {
  useState,
  useRef,
  useEffect,
  useContext,
  type ReactNode,
  type ReactElement,
  type FC,
} from 'react';
import { createPortal } from 'react-dom';
import { TooltipPosition } from './TooltipPosition';
import styles from './Tooltip.module.css';
import { ThemeContext } from 'shared/lib/contexts/ThemeContext/ThemeContext';

interface TooltipProps {
  content: ReactNode;
  position?: TooltipPosition;
  children: ReactElement;
  className?: string;
}

export const Tooltip: FC<TooltipProps> = props => {
  const {
    content,
    position = TooltipPosition.TOP,
    children,
    className,
  } = props;

  const [isVisible, setIsVisible] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const { theme } = useContext(ThemeContext);

  const calculatePosition = () => {
    if (!triggerRef.current) return;

    const rect = triggerRef.current.getBoundingClientRect();
    const tooltipHeight = tooltipRef.current?.offsetHeight || 0;
    const tooltipWidth = tooltipRef.current?.offsetWidth || 0;

    let x = 0;
    let y = 0;

    switch (position) {
      case TooltipPosition.TOP:
        x = rect.left + rect.width / 2;
        y = rect.top - tooltipHeight + 10;
        break;
      case TooltipPosition.BOTTOM:
        x = rect.left + rect.width / 2;
        y = rect.bottom + 25;
        break;
      case TooltipPosition.LEFT:
        x = rect.left - tooltipWidth + 55;
        y = rect.top + rect.height / 2;
        break;
      case TooltipPosition.RIGHT:
        x = rect.right + 75;
        y = rect.top + rect.height / 2;
        break;
    }

    setCoords({ x, y });
  };

  useEffect(() => {
    if (isVisible) {
      calculatePosition();
      window.addEventListener('resize', calculatePosition);
      window.addEventListener('scroll', calculatePosition);
    }

    return () => {
      window.removeEventListener('resize', calculatePosition);
      window.removeEventListener('scroll', calculatePosition);
    };
  }, [isVisible, position]);

  const handleMouseEnter = () => setIsVisible(true);
  const handleMouseLeave = () => setIsVisible(false);

  const tooltipRoot = document.getElementById('tooltip-root');

  if (!tooltipRoot) return <>{children}</>;

  const classNames = `${styles.tooltip} ${styles[position]} ${styles[theme]} ${className}`;

  const style = {
    left: coords.x,
    top: coords.y,
    transform: `translate(-50%, -50%)`,
  };

  return (
    <>
      <div
        ref={triggerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </div>
      {isVisible &&
        createPortal(
          <div ref={tooltipRef} className={classNames} style={style}>
            {content}
          </div>,
          tooltipRoot,
        )}
    </>
  );
};
