import { Button } from '@headlessui/react';
import { useRef, type FC } from 'react';

interface ClickData {
  startTime: number | null;
  clickCount: number;
}

export const ClickTimer: FC = () => {
  const clickDataRef = useRef<ClickData>({ startTime: null, clickCount: 0 });

  const handleClick = () => {
    const currentTime = Date.now();
    const clickData = clickDataRef.current;

    if (clickData.startTime === null) {
      clickData.startTime = currentTime;
      clickData.clickCount = 1;
      console.log(
        'First click! Time start:',
        new Date(currentTime).toLocaleTimeString(),
      );
      return;
    }

    clickData.clickCount += 1;
    const timeDifference = currentTime - clickData.startTime;

    console.log({
      differentTime: `${timeDifference} ms (${(timeDifference / 1000).toFixed(
        2,
      )} sec)`,
      countClick: clickData.clickCount,
      currentTime: new Date(currentTime).toLocaleTimeString(),
      firstTimeClick: new Date(clickData.startTime).toLocaleTimeString(),
    });
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>ClickTimer</h2>
      <Button onClick={handleClick}>Click me</Button>
    </div>
  );
};
