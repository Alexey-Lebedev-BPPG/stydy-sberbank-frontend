import { MainPage } from 'pages/MainPage';
import { PortalShowcasePage } from 'pages/PortalShowcasePage';
import { RefPage } from 'pages/RefPage';
import { createBrowserRouter } from 'react-router';

export const router = createBrowserRouter([
  { path: '/', Component: PortalShowcasePage },
  { path: '/mainPage', Component: MainPage },
  { path: '/ref', Component: RefPage },
]);
