import { Button, Field, Input, Label } from '@headlessui/react';
import { useActionState, useRef, type ChangeEvent } from 'react';

interface FormDataState {
  name: string;
  email: string;
  message: string;
  dirty: boolean;
  submitting: boolean;
  success: boolean;
  error?: string;
}

const initialState: FormDataState = {
  name: '',
  email: '',
  message: '',
  dirty: false,
  submitting: false,
  success: false,
};

type FormAction =
  | { type: 'SET_FIELD'; field: string; value: string }
  | { type: 'SET_DIRTY'; dirty: boolean }
  | { type: 'SUBMIT_START' }
  | { type: 'SUBMIT_SUCCESS' }
  | { type: 'SUBMIT_ERROR'; error: string }
  | { type: 'RESET' };

const formReducer = (
  state: FormDataState,
  action: FormAction,
): FormDataState => {
  switch (action.type) {
    case 'SET_FIELD':
      return {
        ...state,
        [action.field]: action.value,
        dirty: true,
        error: undefined,
      };

    case 'SUBMIT_START':
      return { ...state, submitting: true, success: false, error: undefined };
    case 'SUBMIT_SUCCESS':
      return { ...initialState, success: true };
    case 'SUBMIT_ERROR':
      return { ...state, submitting: false, error: action.error };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
};

const submitFormData = async (data: {
  name: string;
  email: string;
  message: string;
}): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, 1500));

  if (!data.name.trim() || !data.email.trim() || !data.message.trim())
    throw new Error('All fields are required');

  if (!data.email.includes('@')) throw new Error('Invalid email format');

  console.log('Form submitted:', data);
};

export const ActionStateWithReducer = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const [state, submitAction, isPending] = useActionState<
    FormDataState,
    FormData
  >(async (previousState: FormDataState, formData: FormData) => {
    let currentState = formReducer(previousState, { type: 'SUBMIT_START' });

    try {
      const formDataObj = {
        name: formData.get('name') as string,
        email: formData.get('email') as string,
        message: formData.get('message') as string,
      };

      await submitFormData(formDataObj);

      return formReducer(currentState, { type: 'SUBMIT_SUCCESS' });
    } catch (error) {
      return formReducer(currentState, {
        type: 'SUBMIT_ERROR',
        error: error instanceof Error ? error.message : 'Submission failed',
      });
    }
  }, initialState);

  const handleInputChange =
    (field: string) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      console.log(`Field ${field} changed:`, e.target.value);
    };

  const handleReset = () => {
    formRef.current?.reset();
    submitAction(new FormData());
  };

  const style = {
    marginTop: '0.5rem',
    width: '100%',
    borderRadius: '0.5rem',
    border: '1px solid grey',
    padding: '0.375rem 0.75rem',
    color: 'black',
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', margin: '10px' }}>
      <h3>Form with Action State Reducer</h3>
      <form ref={formRef} action={submitAction}>
        <Field>
          <Label>Name:</Label>
          <Input
            id='name'
            name='name'
            type='text'
            defaultValue={state.name}
            onChange={handleInputChange('name')}
            disabled={isPending}
            style={style}
          />
        </Field>
        <Field>
          <Label>Email:</Label>
          <Input
            id='email'
            name='email'
            type='email'
            defaultValue={state.email}
            onChange={handleInputChange('email')}
            style={style}
            disabled={isPending}
          />
        </Field>
        <Field>
          <Label>Message:</Label>
          <Input
            id='message'
            name='message'
            type='text'
            defaultValue={state.message}
            onChange={handleInputChange('message')}
            style={style}
            disabled={isPending}
          />
        </Field>
        <Button type='submit' disabled={isPending}>
          {isPending ? 'Submitting...' : 'Submit Form'}
        </Button>
        <Button
          onClick={handleReset}
          disabled={isPending}
          style={{ marginLeft: '1rem' }}
        >
          Reset
        </Button>
      </form>
      {state.success && (
        <p style={{ color: 'green', marginTop: '15px' }}>
          Form submitted successfully!
        </p>
      )}
      {state.error && (
        <p style={{ color: 'red', marginTop: '15px' }}>Error: {state.error}</p>
      )}
      <div style={{ marginTop: '15px', color: '#666' }}>
        <p>Dirty: {state.dirty ? 'Yes' : 'No'}</p>
        <p>Submitting: {state.submitting ? 'Yes' : 'No'}</p>
        <p>Success: {state.success ? 'Yes' : 'No'}</p>
      </div>
    </div>
  );
};
