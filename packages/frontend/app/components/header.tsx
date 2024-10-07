import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
} from "~/components/ui/navigation-menu";
import { UserNav } from "./UserNav";
import { UserContext } from "~/providers/userContext";
import { useContext } from "react";

export default function Header() {
  const location = useLocation();
  const { user } = useContext(UserContext);
  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="sticky top-0 p-2 w-full">
      <div className="rounded-xl border border-white/20 shadow-lg p-6  h-16 flex items-center overflow-hidden justify-end text-white font-semibold w-full px-8 relative border-gray-400">
        <div className="absolute left-0 top-0 w-full h-full opacity-50 blur-lg rounded-xl overflow-hidden bg-[#d7d7d7]"></div>
        <div className="flex items-center justify-end max-w-2xl  bg-transparent">
          <NavigationMenu>
            <NavigationMenuList className="gap-4 justify-end">
              <NavigationMenuItem>
                <Link to="/">
                  <Button
                    variant="link"
                    className={`text-gray-800 font-regula ${
                      isActive("/") ? "underline" : ""
                    }`}
                  >
                    Home
                  </Button>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/audio">
                  <Button
                    variant="link"
                    className={`text-gray-800 font-regular ${
                      isActive("/audio") ? "underline" : ""
                    }`}
                  >
                    Audio Recordings
                  </Button>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/template">
                  <Button
                    variant="link"
                    className={`text-gray-800 font-regular ${
                      isActive("/reports") ? "underline" : ""
                    }`}
                  >
                    Report templates
                  </Button>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                {user && <UserNav user={user} />}
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="absolute inset-0 rounded-xl border-t-2 border-l-2 border-white/50 pointer-events-none bg-transparent backdrop-blur-md"></div>
      </div>
    </div>
  );
}
