import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./reset.css";
import router from "./routes";

export default function App() {
  return (
    <Theme>
      <ToastContainer />
      <RouterProvider router={router} />
    </Theme>
  );
}
