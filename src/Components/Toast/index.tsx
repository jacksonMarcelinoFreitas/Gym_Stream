import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const toastClasses = {
  success: "bg-green-500 text-white",
  error: "bg-red-500 text-white",
  info: "bg-blue-500 text-white",
  warning: "bg-yellow-500 text-black",
  default: "bg-gray-700 text-white",
};

const Toast = () => {
  return (
    <div>
      <ToastContainer
        toastClassName={(context) =>
          toastClasses[context.type] || toastClasses.default
        }
      />
    </div>
  );
};

export default Toast;
