import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './Hooks/auth';
import ReactDOM from 'react-dom/client';
import { Routes } from './Routes';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <ToastContainer />
    <AuthProvider>
      <Routes />
    </AuthProvider>
  </>
)
