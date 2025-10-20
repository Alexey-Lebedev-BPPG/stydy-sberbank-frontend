import './styles/index.css';
import { StoreProvider } from './providers/StoreProvider';
import { ToastifyProvider } from './providers/Toastify';
import { RouterProvider } from 'react-router';
import { router } from '../lesson7/router';

function App() {
  return (
    <StoreProvider>
      {/* Old router */}
      {/* <RouterProvider router={router} /> */}
      {/* New router */}
      {/* <AppRouter /> */}
      {/* router for lesson 7 */}
      <RouterProvider router={router} />
      <ToastifyProvider />
    </StoreProvider>
  );
}

export default App;
