import { RouterProvider } from 'react-router';
import { router } from './router';
import './styles/index.css';
import { StoreProvider } from './providers/StoreProvider';
import { ToastifyProvider } from './providers/Toastify';

function App() {
  return (
    <StoreProvider>
      <RouterProvider router={router} />
      <ToastifyProvider />
    </StoreProvider>
  );
}

export default App;
