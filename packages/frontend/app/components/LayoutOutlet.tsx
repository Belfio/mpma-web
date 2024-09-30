import { Outlet } from "@remix-run/react";
import Header from "./header";
import { useContext } from "react";
import { UserContext } from "~/providers/userContext";

export default function Layout() {
  const { user } = useContext(UserContext);
  return (
    <div className="">
      {user && <Header />}
      <Outlet />
    </div>
  );
}
