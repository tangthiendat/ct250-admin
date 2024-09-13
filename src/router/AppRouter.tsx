import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import Users from "../pages/Users";
import Roles from "../pages/Roles";
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
        path: "/users",
        element: <Users />,
      },
      {
        path: "/roles",
        element: <Roles />,
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
