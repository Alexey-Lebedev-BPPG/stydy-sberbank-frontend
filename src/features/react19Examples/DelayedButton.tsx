import { Button } from '@headlessui/react';
import { use, useRef, createContext, type ReactNode } from 'react';

const HandlersContext = createContext<{
  handleClick: () => void;
  handleCancel: () => void;
} | null>(null);

const HandlersProvider = ({ children }: { children: ReactNode }) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handlers = {
    handleClick: () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      console.log('Starting timer...');

      timeoutRef.current = setTimeout(() => {
        console.log('Done!');
        timeoutRef.current = null;
      }, 2000);
    },

    handleCancel: () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
        console.log('Timer cancelled');
      }
    },
  };

  return (
    <HandlersContext.Provider value={handlers}>
      {children}
    </HandlersContext.Provider>
  );
};

const ButtonWithUse = () => {
  const handlers = use(HandlersContext);

  if (!handlers) return null;

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', margin: '10px' }}>
      <h3>Delayed Button with use() in console</h3>
      <Button onClick={handlers.handleClick}>Click me (2s delay)</Button>
      <Button onClick={handlers.handleCancel}>Cancel</Button>
    </div>
  );
};

export const DelayedButton = () => {
  return (
    <HandlersProvider>
      <ButtonWithUse />
    </HandlersProvider>
  );
};
