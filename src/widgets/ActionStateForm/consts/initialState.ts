import type { FormState } from '../model/types';

export const initialState: FormState = {
  success: false,
  error: null,
  message: null,
  step: 1,
};
