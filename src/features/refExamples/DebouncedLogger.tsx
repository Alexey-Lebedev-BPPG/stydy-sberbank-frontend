import { Input } from '@headlessui/react';
import { useState, useRef, type FC, type ChangeEvent, useEffect } from 'react';

export const DebouncedLogger: FC = () => {
  const [inputValue, setInputValue] = useState('');

  const timeoutRef = useRef<number | null>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      console.log('prev timer will be cleared');
    }

    timeoutRef.current = setTimeout(() => {
      console.log('value: ', value);
      timeoutRef.current = null;
    }, 1000);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
      <h2>DebouncedLogger</h2>
      <Input
        type='text'
        value={inputValue}
        onChange={handleInputChange}
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
    </div>
  );
};
