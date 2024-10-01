import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
} from "~/components/ui/navigation-menu";

export default function Header() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="h-16 bg-gray-800  flex items-center justify-end text-white font-semibold w-screen px-8 m-auto border-[2px] border-b border-gray-400">
      <div className="flex items-center justify-end max-w-2xl ">
        <NavigationMenu>
          <NavigationMenuList className="gap-4 justify-end">
            <NavigationMenuItem>
              <Link to="/">
                <Button
                  variant="link"
                  className={`text-gray-100 font-regula ${
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
                  className={`text-gray-100 font-regular ${
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
                  className={`text-gray-100 font-regular ${
                    isActive("/reports") ? "underline" : ""
                  }`}
                >
                  Report templates
                </Button>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  );
}
