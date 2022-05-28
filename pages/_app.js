/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-props-no-spreading */
import 'bootstrap/dist/css/bootstrap.css';
// import '@/styles/dashboard/admin.css';
import '@/styles/responsive.css';
import '/public/fonts/fontawesome/css/all.min.css';
// dashboard
import '@/styles/dashboard/plugins/nucleo/css/nucleo.css';
import '@/styles/dashboard/css/nextjs-argon-dashboard.css';

import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { Router, useRouter } from 'next/router';
// if the route is /admin don't render global styles

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  // console.log(router.pathname);

  useEffect(() => {
    import('bootstrap/dist/js/bootstrap');

    // if the route is /admin don't render global styles
    if (router.pathname.includes('/admin')) {
      // console.log(`The page${router.pathname} includes admin`);
    } else {
      import('@/styles/globals.css');
    }
  }, []);
  // eslint-disable-next-line react/jsx-props-no-spreading
  return (
    <>
      <Component {...pageProps} />
      <ToastContainer />
    </>
  );
}

export default MyApp;
