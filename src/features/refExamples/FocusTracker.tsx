import { Button, Input } from '@headlessui/react';
import { useRef, type FC, type FocusEvent } from 'react';

export const FocusTracker: FC = () => {
  const firstInputRef = useRef<HTMLInputElement>(null);
  const secondInputRef = useRef<HTMLInputElement>(null);

  const focusTransitionCountRef = useRef(0);

  const handleFocus = (event: FocusEvent<HTMLInputElement>) => {
    if (event.relatedTarget) {
      focusTransitionCountRef.current += 1;

      console.log({
        typeEvent: 'Change focus',
        fromElement: event.relatedTarget.id,
        toElement: event.target.id,
        countTransition: focusTransitionCountRef.current,
      });
    } else {
      console.log({ typeEvent: 'First focus', element: event.target.id });
    }
  };

  const focusFirstInput = () => {
    if (firstInputRef.current) {
      firstInputRef.current.focus();
      console.log('focus for first input');
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
      <h2>FocusTracker</h2>
      <div style={{ marginBottom: '15px' }}>
        <Input
          ref={firstInputRef}
          type='text'
          onFocus={handleFocus}
          id='1'
          style={{
            display: 'block',
            marginTop: '0.75rem',
            width: '100%',
            borderRadius: '0.5rem',
            border: 'none',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            paddingLeft: '0.75rem',
            paddingRight: '0.75rem',
            paddingTop: '0.375rem',
            paddingBottom: '0.375rem',
            fontSize: '0.875rem',
            lineHeight: '1.5rem',
            color: 'white',
          }}
        />
        <Input
          ref={secondInputRef}
          type='text'
          onFocus={handleFocus}
          id='2'
          style={{
            display: 'block',
            marginTop: '0.75rem',
            width: '100%',
            borderRadius: '0.5rem',
            border: 'none',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            paddingLeft: '0.75rem',
            paddingRight: '0.75rem',
            paddingTop: '0.375rem',
            paddingBottom: '0.375rem',
            fontSize: '0.875rem',
            lineHeight: '1.5rem',
            color: 'white',
          }}
        />
      </div>
      <Button onClick={focusFirstInput}>Focus for first input</Button>
    </div>
  );
};
