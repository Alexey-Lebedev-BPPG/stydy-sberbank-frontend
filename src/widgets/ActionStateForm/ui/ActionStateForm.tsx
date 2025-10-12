import { useActionState, useState, type ChangeEvent, type FC } from 'react';
import { subscribeAction } from '../model/lib/subscribeAction';
import { initialState } from '../consts/initialState';

export const ActionStateForm: FC = () => {
  const [email, setEmail] = useState('');

  const [state, formAction, isPending] = useActionState(
    subscribeAction,
    initialState,
  );

  const handleBack = () => window.location.reload();

  return (
    <div style={{ maxWidth: '400px', margin: '2rem auto', padding: '1rem' }}>
      <h2>Subscription</h2>
      {state.step === 1 && (
        <form action={formAction}>
          <input type='hidden' name='step' value='1' />
          <div style={{ marginBottom: '1rem' }}>
            <label
              htmlFor='email'
              style={{ display: 'block', marginBottom: '0.5rem' }}
            >
              Enter your email:
            </label>
            <input
              id='email'
              type='email'
              name='email'
              value={email}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
              disabled={isPending}
              style={{
                width: '100%',
                padding: '0.5rem',
                border: state.error ? '1px solid red' : '1px solid #ccc',
                borderRadius: '4px',
              }}
            />
            {state.error && !state.success && (
              <p
                style={{ color: 'red', margin: '0.5rem 0', fontSize: '0.9rem' }}
              >
                {state.error}
              </p>
            )}
          </div>
          <button
            type='submit'
            disabled={isPending || !email}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: isPending ? '#ccc' : '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: isPending || !email ? 'not-allowed' : 'pointer',
            }}
          >
            {isPending ? 'Sending...' : 'Continue'}
          </button>
        </form>
      )}
      {state.step === 2 && !state.success && (
        <form action={formAction}>
          <input type='hidden' name='step' value='2' />
          <input type='hidden' name='email' value={email} />
          <div style={{ marginBottom: '1rem' }}>
            <p>
              Confirm your email subscription: <strong>{email}</strong>
            </p>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button
              type='button'
              onClick={handleBack}
              disabled={isPending}
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: isPending ? 'not-allowed' : 'pointer',
              }}
            >
              Back
            </button>
            <button
              type='submit'
              disabled={isPending}
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: isPending ? '#ccc' : '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: isPending ? 'not-allowed' : 'pointer',
              }}
            >
              {isPending ? 'Processing...' : 'Confirm subscription'}
            </button>
          </div>
        </form>
      )}
      {state.success && (
        <div
          style={{
            padding: '1rem',
            backgroundColor: '#d4edda',
            border: '1px solid #c3e6cb',
            borderRadius: '4px',
            color: '#155724',
          }}
        >
          <h3>Successfully!</h3>
          <p>{state.message}</p>
          <button
            onClick={handleBack}
            style={{
              marginTop: '1rem',
              padding: '0.5rem 1rem',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Create a new subscription
          </button>
        </div>
      )}
      {!state.success && (
        <div
          style={{
            marginTop: '2rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <div
            style={{
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              backgroundColor: state.step >= 1 ? '#007bff' : '#ccc',
            }}
          />
          <span>Entering email</span>
          <div
            style={{ width: '40px', height: '2px', backgroundColor: '#ccc' }}
          />
          <div
            style={{
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              backgroundColor: state.step >= 2 ? '#007bff' : '#ccc',
            }}
          />
          <span>Confirmation</span>
        </div>
      )}
    </div>
  );
};
