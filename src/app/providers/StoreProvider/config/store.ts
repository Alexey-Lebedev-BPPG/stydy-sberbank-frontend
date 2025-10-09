import { configureStore, type ReducersMapObject } from '@reduxjs/toolkit';
import type { StateSchema } from './stateSchema';
import { baseApi } from 'shared/api/baseApi';

export const createReduxStore = (initialState?: StateSchema) => {
  const rootReducers: ReducersMapObject<StateSchema> = {
    [baseApi.reducerPath]: baseApi.reducer,
  };

  const store = configureStore({
    devTools: true,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(baseApi.middleware),
    preloadedState: initialState,
    reducer: rootReducers,
  });

  return store;
};
