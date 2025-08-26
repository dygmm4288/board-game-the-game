import { createBrowserRouter } from "react-router-dom";
import RoomRedirect from "../components/middleware/RoomRedirect";
import Game from "../pages/Game";
import Layout from "../pages/Layout";
import Lobby from "../pages/Lobby";
import Login from "../pages/Login";
import NotFoundPage from "../pages/NotFoundPage";
import Room from "../pages/Room";
import ProtectedRoute from "./ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <RoomRedirect>
        <Layout />
      </RoomRedirect>
    ),
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
      {
        path: "lobby",
        element: (
          <ProtectedRoute>
            <Lobby />
          </ProtectedRoute>
        ),
        children: [],
      },
      {
        path: "room/:id",
        element: (
          <ProtectedRoute>
            <Room />
          </ProtectedRoute>
        ),
      },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);

export default router;
