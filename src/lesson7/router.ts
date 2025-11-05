import { MainPage } from 'pages/MainPage';
import { PortalShowcasePage } from 'pages/PortalShowcasePage';
import { React19ExamplesPage } from 'pages/React19ExamplesPage';
import { RefPage } from 'pages/RefPage';
import { createBrowserRouter } from 'react-router';

export const router = createBrowserRouter([
  { path: '/', Component: React19ExamplesPage },
  { path: '/portal_showcase_page', Component: PortalShowcasePage },
  { path: '/mainPage', Component: MainPage },
  { path: '/ref', Component: RefPage },
]);
