import { createBrowserRouter } from "react-router-dom";
import Game from "../pages/Game";
import Layout from "../pages/Layout";
import Login from "../pages/Login";
import NotFoundPage from "../pages/NotFoundPage";
import ProtectedRoute from "./ProtectedRoute";

const router = createBrowserRouter([
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
            <Game />
          </ProtectedRoute>
        ),
        children: [],
      },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);

export default router;
