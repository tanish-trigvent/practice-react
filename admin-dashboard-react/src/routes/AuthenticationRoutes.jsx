// import { lazy } from 'react';

// project imports
// import Loadable from 'ui-component/Loadable';
import MinimalLayout from 'layout/MinimalLayout';
import Login from 'views/pages/authentication/Login';
import Register from 'views/pages/authentication/Register3';
import LoginRoutes from './LoginRoutes';
import ForgotPassword from 'views/pages/authentication/ForgotPassword';
import OtpVerification from 'views/pages/authentication/OtpVerification';
import NewPassword from 'views/pages/authentication/NewPassword';

// login option 3 routing
// const AuthLogin3 = Loadable(lazy(() => import('views/pages/authentication3/Login3')));
// const AuthRegister3 = Loadable(lazy(() => import('views/pages/authentication3/Register3')));

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = {
  path: '/',
  element: <LoginRoutes><MinimalLayout /></LoginRoutes>,
  children: [
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/register',
      element: <Register />
    },
    {
      path: '/forgot-password',
      element: <ForgotPassword />
    },
    {
      path: '/otp-verify',
      element: <OtpVerification />
    }, {
      path: 'resetPassword',
      element: <NewPassword />
    }
  ]
};

export default AuthenticationRoutes;
