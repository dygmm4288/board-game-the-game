import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import { RouterProvider } from "react-router-dom";
import "./reset.css";
import router from "./routes";

export default function App() {
  return (
    <Theme>
      <RouterProvider router={router} />
    </Theme>
  );
}
