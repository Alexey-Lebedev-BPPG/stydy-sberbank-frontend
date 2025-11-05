import { DelayedButton } from 'features/react19Examples/DelayedButton';
import { FormWithAsyncSave } from 'features/react19Examples/FormWithAsyncSave';
import { TodoListOptimistic } from 'features/react19Examples/TodoListOptimistic';
import { ActionStateWithReducer } from 'features/react19Examples/ActionStateWithReducer';
import type { FC } from 'react';

export const React19ExamplesPage: FC = () => {
  return (
    <div>
      <h1>React 19 Examples Page</h1>
      <DelayedButton />
      <FormWithAsyncSave />
      <TodoListOptimistic />
      <ActionStateWithReducer />
    </div>
  );
};
