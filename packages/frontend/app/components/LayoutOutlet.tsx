import { Outlet, useLocation } from "@remix-run/react";
import Header from "./header";

export default function Layout() {
  const location = useLocation();
  const hideHeader =
    location.pathname.includes("login") ||
    location.pathname.includes("register");
  return (
    <div className="">
      {!hideHeader && <Header />}
      <Outlet />
    </div>
  );
}
