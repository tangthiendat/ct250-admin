import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProtectedRoute from "../features/auth/ProtectedRoute";
import AdminLayout from "../layouts/AdminLayout";
import Airplanes from "../pages/Airplanes";
import Airports from "../pages/Airports";
import ErrorIndicator from "../pages/ErrorPage";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Permissions from "../pages/Permissions";
import Roles from "../pages/Roles";
import Routes from "../pages/Routes";
import Schedule from "../pages/Schedule";
import Users from "../pages/Users";
import Meals from "../pages/Meals";

const router = createBrowserRouter([
  {
    element: <Login />,
    path: "/login",
  },
  {
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
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
      {
        path: "/airports",
        element: <Airports />,
      },
      {
        path: "/airplanes",
        element: <Airplanes />,
      },
      {
        path: "/routes",
        element: <Routes />,
      },
      {
        path: "/schedule",
        element: <Schedule />,
      },
      {
        path: "/meals",
        element: <Meals />,
      },
    ],
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
