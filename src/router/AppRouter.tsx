import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import User from "../pages/User";
import Role from "../pages/Role";
import ErrorIndicator from "../pages/ErrorPage";
import Home from "../pages/Home";

const router = createBrowserRouter([
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
    ],
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
