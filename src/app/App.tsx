import { RouterProvider } from 'react-router';
import { router } from './router';
import './styles/index.css';
import { StoreProvider } from './providers/StoreProvider';

function App() {
  return (
    <StoreProvider>
      <RouterProvider router={router} />
    </StoreProvider>
  );
}

export default App;
