import type { FC, ReactNode } from 'react';
import { createReduxStore } from '../config/store';
import type { StateSchema } from '../config/stateSchema';
import { Provider } from 'react-redux';

interface IStoreProviderProps {
  children?: ReactNode;
  initialState?: StateSchema;
}

export const StoreProvider: FC<IStoreProviderProps> = ({
  children,
  initialState,
}) => {
  const store = createReduxStore(initialState as StateSchema);

  return <Provider store={store}>{children}</Provider>;
};
