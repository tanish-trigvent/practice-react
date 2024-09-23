import { lazy } from "react";

// project imports
import MainLayout from "layout/MainLayout";
import Loadable from "ui-component/Loadable";
import PrivateRoute from "./PrivateRoutes";
import AccountSetting from "views/pages/accountSetting";
import AdminRoute from "./AdminRoute";

const DashboardDefault = Loadable(lazy(() => import("views/dashboard")));
const Todo = Loadable(lazy(() => import("views/pages/Todo")));
const Users = Loadable(lazy(() => import("views/pages/Users")));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: "/",
  element: (
    <PrivateRoute>
      <MainLayout />
    </PrivateRoute>
  ),
  children: [
    {
      path: "/",
      element: (
        <PrivateRoute>
          <DashboardDefault />
        </PrivateRoute>
      ),
    },
    {
      path: "/todo",
      element: <Todo />,
    },
    {
      path: "/users",
      element: (
        <AdminRoute>
          <Users />
        </AdminRoute>
      ),
    },
    {
      path: "/account-settings",
      element: <AccountSetting />,
    },
  ],
};

export default MainRoutes;
