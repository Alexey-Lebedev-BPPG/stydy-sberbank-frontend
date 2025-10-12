import { Bounce, ToastContainer } from 'react-toastify';

export const ToastifyProvider = () => (
  <ToastContainer
    position='top-right'
    autoClose={3000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick={false}
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme='colored'
    transition={Bounce}
  />
);
