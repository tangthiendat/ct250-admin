import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProtectedRoute from "../features/auth/ProtectedRoute";
import FeeDetails from "../features/flight/fee/FeeDetails";
import FlightDetails from "../features/flight/schedule/FlightDetails";
import AdminLayout from "../layouts/AdminLayout";
import Airplanes from "../pages/Airplanes";
import Airports from "../pages/Airports";
import Baggages from "../pages/Baggages";
import Coupons from "../pages/Coupons";
import ErrorIndicator from "../pages/ErrorPage";
import Fees from "../pages/Fees";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Meals from "../pages/Meals";
import Permissions from "../pages/Permissions";
import Roles from "../pages/Roles";
import Routes from "../pages/Routes";
import Schedule from "../pages/Schedule";
import Users from "../pages/Users";
import PaymentMethods from "../pages/PaymentMethods";

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
        children: [
          {
            path: "",
            index: true,
            element: <Schedule />,
          },
          {
            path: ":id",
            element: <FlightDetails />,
          },
        ],
      },
      {
        path: "/fees",
        children: [
          {
            path: "",
            index: true,
            element: <Fees />,
          },
          {
            path: ":id",
            element: <FeeDetails />,
          },
        ],
      },
      {
        path: "/meals",
        element: <Meals />,
      },
      {
        path: "/baggages",
        element: <Baggages />,
      },
      {
        path: "/coupons",
        element: <Coupons />,
      },
      {
        path: "/payment-methods",
        element: <PaymentMethods />,
      },
    ],
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
