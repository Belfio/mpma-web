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
    <div className="h-16 bg-white/15  flex items-center justify-center text-white font-semibold mt-4 w-min-2/3 w-fit rounded-3xl px-8 m-auto border-[1px] border-white">
      <div className="flex items-center justify-between max-w-2xl mx-auto">
        <NavigationMenu>
          <NavigationMenuList className="gap-4 justify-center">
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
              <Link to="/reports">
                <Button
                  variant="link"
                  className={`text-gray-800 font-regular ${
                    isActive("/reports") ? "underline" : ""
                  }`}
                >
                  Reports
                </Button>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  );
}
