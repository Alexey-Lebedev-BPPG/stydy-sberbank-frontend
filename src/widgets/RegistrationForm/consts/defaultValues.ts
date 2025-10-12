import type { TRegistrationForm } from '../model/types';

export const defaultValues: TRegistrationForm = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  links: [{ value: '' }],
};
