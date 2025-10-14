import { Input } from '@headlessui/react';
import { useState, useRef, useEffect, type FC, type ChangeEvent } from 'react';

export const PreviouslyInput: FC = () => {
  const [currentValue, setCurrentValue] = useState('');

  const previousValueRef = useRef('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setCurrentValue(e.target.value);

  useEffect(() => {
    previousValueRef.current = currentValue;
  }, [currentValue]);

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
      <h2>PreviouslyInput</h2>
      <div style={{ marginBottom: '15px' }}>
        <Input
          type='text'
          value={currentValue}
          onChange={handleChange}
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
      <div
        style={{
          marginBottom: '15px',
          padding: '10px',
          backgroundColor: '#f8f9fa',
          borderRadius: '5px',
          border: '1px solid #dee2e6',
          overflowWrap: 'break-word',
        }}
      >
        Current value: {currentValue || 'none'}
      </div>
      <div
        style={{
          padding: '10px',
          backgroundColor: '#e7f3ff',
          borderRadius: '5px',
          border: '1px solid #b3d9ff',
          overflowWrap: 'break-word',
        }}
      >
        Prev value: {previousValueRef.current || 'none'}
      </div>
    </div>
  );
};
