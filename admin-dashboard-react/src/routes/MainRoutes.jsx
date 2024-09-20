import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import PrivateRoute from './PrivateRoutes';


const DashboardDefault = Loadable(lazy(() => import('views/dashboard')));
const Todo = Loadable(lazy(() => import('views/pages/Todo')))
const Users = Loadable(lazy(() => import('views/pages/Users')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <PrivateRoute><MainLayout /></PrivateRoute>,
  children: [
    {
      path: '/',
      element: <PrivateRoute><DashboardDefault /></PrivateRoute>
    }, {
      path: '/todo',
      element: <Todo />
    }, {
      path: '/users',
      element: <Users />
    }
  ]
};

export default MainRoutes;
