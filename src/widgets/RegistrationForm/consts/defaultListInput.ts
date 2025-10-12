import type { TRegistrationForm } from '../model/types';

export const defaultListInput: {
  name: keyof TRegistrationForm;
  title: string;
}[] = [
  { name: 'username', title: 'Username' },
  { name: 'email', title: 'Email' },
  { name: 'password', title: 'Password' },
  { name: 'confirmPassword', title: 'Confirm Password' },
];
