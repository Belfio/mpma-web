import { Outlet, useLocation } from "@remix-run/react";
import Header from "./header";

export default function Layout() {
  const location = useLocation();
  const hideHeader =
    location.pathname.includes("login") ||
    location.pathname.includes("register");
  return (
    <div className="h-full top-0">
      {!hideHeader && <Header />}
      <Outlet />
    </div>
  );
}
