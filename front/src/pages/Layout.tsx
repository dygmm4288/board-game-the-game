import { Link, Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <section>
      <Link to='/game'>게임</Link>
      <Outlet />
    </section>
  );
}
