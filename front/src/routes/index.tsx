import { createBrowserRouter, Outlet } from "react-router-dom";
import Layout from "../pages/Layout";
import Login from "../pages/Login";
import NotFoundPage from "../pages/NotFoundPage";
import ProtectedRoute from "./ProtectedRoute";

const root = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "login", element: <Login type='login' /> },
      { path: "signup", element: <Login type='signup' /> },
      {
        path: "game",
        element: (
          <ProtectedRoute>
            <Outlet />
          </ProtectedRoute>
        ),
        children: [],
      },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);

export default root;
