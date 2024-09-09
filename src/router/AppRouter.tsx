import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import User from "../pages/User";
import Role from "../pages/Role";
import ErrorIndicator from "../pages/ErrorPage";
import Home from "../pages/Home";
import Permissions from "../pages/Permissions";
import Login from "../pages/Login";

const router = createBrowserRouter([
  {
    element: <Login />,
    path: "/login",
  },
  {
    element: <AdminLayout />,
    errorElement: <ErrorIndicator />,
    children: [
      {
        path: "/",
        index: true,
        element: <Home />,
      },
      {
        path: "/user",
        element: <User />,
      },
      {
        path: "/role",
        element: <Role />,
      },
      {
        path: "/permissions",
        element: <Permissions />,
      },
    ],
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
