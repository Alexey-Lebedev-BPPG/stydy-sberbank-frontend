import { ActionStatePage } from 'pages/ActionStatePage';
import { MainPage } from 'pages/MainPage';
import { RefPage } from 'pages/RefPage';
import { RegistrationPage } from 'pages/RegistrationPage';
import { createBrowserRouter } from 'react-router';

export const router = createBrowserRouter([
  { path: '/', Component: RefPage },
  { path: '/registration_page', Component: RegistrationPage },
  { path: '/action_state', Component: ActionStatePage },
  { path: '/tasks', Component: MainPage },
]);
