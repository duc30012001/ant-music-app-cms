import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type Props = {};

export default function AppToast({}: Props) {
  return (
    <ToastContainer
      position={'top-right'}
      pauseOnHover
      autoClose={3000}
      pauseOnFocusLoss={false}
    />
  );
}
