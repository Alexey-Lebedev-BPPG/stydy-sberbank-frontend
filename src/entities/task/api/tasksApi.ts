import { baseApi } from 'shared/api/baseApi';
import type { ITaskServer } from '../model/types';

const taskApi = baseApi.injectEndpoints({
  endpoints: build => ({
    getTasks: build.query<ITaskServer[], void>({
      query: () => ({ url: '/todos' }),
      transformResponse: (response: ITaskServer[]) => response,
    }),
  }),
});

export const { useGetTasksQuery } = taskApi;
