import './styles/index.css';
import { StoreProvider } from './providers/StoreProvider';
import { ToastifyProvider } from './providers/Toastify';
import { AppRouter } from 'app/router';

function App() {
  return (
    <StoreProvider>
      {/* Old router */}
      {/* <RouterProvider router={router} /> */}
      {/* New router */}
      <AppRouter />
      <ToastifyProvider />
    </StoreProvider>
  );
}

export default App;
