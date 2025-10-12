import type { FC } from 'react';
import cls from './refPage.module.css';
import { ClickTimer } from 'features/refExamples/ClickTimer';
import { PreviouslyInput } from 'features/refExamples/PreviousInput';
import { FocusTracker } from 'features/refExamples/FocusTracker';
import { DebouncedLogger } from 'features/refExamples/DebouncedLogger';
import { WebSocketLogger } from 'features/refExamples/WebSocketLogger';

const RefPage: FC = () => {
  return (
    <div className={cls['ref-page']}>
      <h1>RefPage</h1>
      <ClickTimer />
      <PreviouslyInput />
      <FocusTracker />
      <DebouncedLogger />
      <WebSocketLogger />
    </div>
  );
};

export default RefPage;
