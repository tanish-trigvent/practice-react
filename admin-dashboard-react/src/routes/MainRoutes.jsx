import { lazy } from "react";

// project imports
import MainLayout from "layout/MainLayout";
import Loadable from "ui-component/Loadable";
import PrivateRoute from "./PrivateRoutes";
import AccountSetting from "views/pages/accountSetting";
import AdminRoute from "./AdminRoute";
import ColorCombination from "views/pages/color-combination";
import ColorSurvey from "views/pages/color-survey";

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
    {
      path: "/color-survey",
      element: <ColorCombination />,
    },
    {
      path: "color-combinations",
      element: (
        <AdminRoute>
          <ColorSurvey />
        </AdminRoute>
      ),
    },
  ],
};

export default MainRoutes;
