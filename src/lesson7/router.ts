import { MainPage } from 'pages/MainPage';
import { RefPage } from 'pages/RefPage';
import { createBrowserRouter } from 'react-router';

export const router = createBrowserRouter([
  { path: '/', Component: MainPage },
  { path: '/ref', Component: RefPage },
]);
