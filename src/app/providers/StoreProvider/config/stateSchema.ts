import type { baseApi } from 'shared/api/baseApi';

export interface StateSchema {
  [baseApi.reducerPath]: ReturnType<typeof baseApi.reducer>;
}
