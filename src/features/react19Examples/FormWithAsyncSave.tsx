import { Button, Input } from '@headlessui/react';
import { useActionState, useEffect } from 'react';

interface FormState {
  status: 'idle' | 'saving' | 'success' | 'error';
  message?: string;
}

const initialState: FormState = {
  status: 'idle',
};

const saveData = async (formData: FormData): Promise<FormState> => {
  await new Promise(resolve => setTimeout(resolve, 1000));

  const data = formData.get('data') as string;

  if (!data.trim()) {
    return { status: 'error', message: 'Data cannot be empty' };
  }

  console.log('Data saved:', data);
  return { status: 'success', message: 'Data saved successfully!' };
};

export const FormWithAsyncSave = () => {
  const [state, submitAction, isPending] = useActionState<FormState, FormData>(
    async (_, formData: FormData) => {
      return await saveData(formData);
    },
    initialState,
  );

  useEffect(() => {
    if (state.status === 'success') {
      const timer = setTimeout(() => {}, 2000);
      return () => clearTimeout(timer);
    }
  }, [state.status]);

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', margin: '10px' }}>
      <h3>Form with Async Save</h3>
      <form action={submitAction}>
        <Input
          id='text'
          type='text'
          name='data'
          placeholder='Enter some data...'
          disabled={isPending}
        />
        <Button type='submit' disabled={isPending}>
          {isPending ? 'Saving...' : 'Save'}
        </Button>
      </form>
      <p style={{ color: state.status === 'success' ? 'green' : 'red' }}>
        {state.message}
      </p>
      <p>Status: {state.status}</p>
    </div>
  );
};
