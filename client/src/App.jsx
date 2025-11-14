import { Outlet } from 'react-router-dom'
import { Toaster } from 'sonner'
import Navbar from "./components/Navbar"
import useCheckToken from './hooks/useCheckToken'
import { useSelector } from 'react-redux';
import LoadingSpinner from './components/LoadingSpinner';

export default function App() {
  useCheckToken();

  const { checkTokenLoading } = useSelector(state => state.user);

  if (checkTokenLoading) {
      return <LoadingSpinner />
  }

  return (
    <>
      <Navbar />
      <Toaster />
      <Outlet />
    </>
  )
}

