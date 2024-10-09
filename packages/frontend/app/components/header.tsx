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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Menu, FileText, FileAudio, House } from "lucide-react";

export default function Header() {
  const location = useLocation();
  const { user } = useContext(UserContext);
  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="fixed top-0 p-2 w-full">
      <div className="rounded-xl border border-white/20 shadow-lg p-6  h-16 flex items-center overflow-hidden justify-end text-white font-semibold w-full px-8 relative border-gray-400">
        <div className="absolute left-0 top-0 w-full h-full opacity-50 blur-lg rounded-xl overflow-hidden bg-[#d7d7d7]"></div>
        {/* desktop menu */}
        <div className="items-center justify-end max-w-2xl bg-transparent hidden lg:flex">
          <NavigationMenu>
            <NavigationMenuList className="gap-4 justify-end">
              <NavigationMenuItem>
                <Link to="/">
                  <Button
                    variant="link"
                    className={`text-gray-800 text-xs tracking-wider uppercase font-bold ${
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
                    className={`text-gray-800 text-xs tracking-wider uppercase font-bold ${
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
                    className={`text-gray-800 text-xs tracking-wider uppercase font-bold ${
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
        {/* burger menu */}
        <div className="flex items-center justify-end lg:max-w-2xl bg-transparent lg:hidden z-10">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost">
                <Menu className="w-8 h-8 text-gray-800" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <Link to="/" className="flex items-center py-2">
                    <House className="mr-2 h-6 w-6" />
                    <span className="text-gray-800 text-lg">Home</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/audio" className="flex items-center py-2">
                    <FileAudio className="mr-2 h-6 w-6" />
                    <span className="text-gray-800 text-lg">
                      Audio Recordings
                    </span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/template" className="flex items-center py-2">
                    <FileText className="mr-2 h-6 w-6" />
                    <span className="text-gray-800 text-lg">
                      Report templates
                    </span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="absolute inset-0 rounded-xl border-t-2 border-l-2 border-white/50 pointer-events-none bg-transparent backdrop-blur-xs"></div>
      </div>
    </div>
  );
}
