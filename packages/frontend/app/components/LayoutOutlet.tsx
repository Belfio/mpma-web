import { Outlet, useLocation } from "@remix-run/react";
import Header from "./header";

export default function Layout() {
  const location = useLocation();
  const hideHeader =
    location.pathname.includes("login") ||
    location.pathname.includes("register");
  return (
    <div className="h-full top-0 pt-16">
      {!hideHeader && <Header />}
      <div className="w-[85%] lg:w-full m-auto lg:max-w-2xl">
        <Outlet />
      </div>
    </div>
  );
}
