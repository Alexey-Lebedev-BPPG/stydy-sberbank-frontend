import { Button, Input } from '@headlessui/react';
import { useOptimistic, useActionState, useRef } from 'react';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
  optimistic?: boolean;
}

interface TodoState {
  todos: Todo[];
  loading: boolean;
}

const initialState: TodoState = {
  todos: [],
  loading: false,
};

const addTodoToServer = async (text: string): Promise<Todo> => {
  await new Promise(resolve => setTimeout(resolve, 1000));

  return { id: Date.now(), text, completed: false };
};

export const TodoListOptimistic = () => {
  const [state, submitAction, isPending] = useActionState<TodoState, FormData>(
    async (previousState: TodoState, formData: FormData) => {
      const text = formData.get('text') as string;

      if (!text.trim()) {
        return previousState;
      }

      try {
        const newTodo = await addTodoToServer(text);
        return {
          todos: [...previousState.todos, newTodo],
          loading: false,
        };
      } catch (error) {
        console.error('Failed to add todo:', error);
        return previousState;
      }
    },
    initialState,
  );

  const [optimisticTodos, addOptimisticTodo] = useOptimistic(
    state.todos,
    (currentTodos: Todo[], newTodo: string) => [
      ...currentTodos,
      { id: Math.random(), text: newTodo, completed: false, optimistic: true },
    ],
  );

  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (formData: FormData) => {
    const text = formData.get('text') as string;

    if (!text.trim()) return;

    addOptimisticTodo(text);

    formRef.current?.reset();

    submitAction(formData);
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', margin: '10px' }}>
      <h3>Optimistic Todo List</h3>
      <form ref={formRef} action={handleSubmit}>
        <Input
          id='text'
          type='text'
          name='text'
          placeholder='Add a new todo...'
          disabled={isPending}
        />
        <Button type='submit' disabled={isPending}>
          {isPending ? 'Adding...' : 'Add Todo'}
        </Button>
      </form>
      <ul>
        {optimisticTodos.map(todo => (
          <li key={todo.id}>
            {todo.text}
            {todo.optimistic && (
              <span style={{ color: 'blue', marginLeft: '10px' }}>
                (saving...)
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
