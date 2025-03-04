import React from 'react'
import Navigation from './pages/Auth/Navigation'
import { Outlet, useLocation } from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Footer from './components/Footer';

const App = () => {
  const location = useLocation();

  // Kiểm tra nếu đường dẫn là "/order/:id" thì ẩn Header và Footer
  const hideHeaderFooter = location.pathname.startsWith("/order/");
  return (
    <>
     <ToastContainer
        position="top-center"
        hideProgressBar={true}
        closeButton={false}
        autoClose={1500}
        draggable={false}
        pauseOnHover
      />
     {!hideHeaderFooter && <Navigation />}
    <main className=''>
      <Outlet/>
    </main>
    {!hideHeaderFooter && <Footer />}
    </>
  )
}

export default App