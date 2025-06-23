import { Menu, School } from "lucide-react";
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ModeToggle from "@/ModeToggle";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useLogoutUserMutation } from "@/features/api/authApi";
import { useSelector } from "react-redux";
// import { Separator } from "@radix-ui/react-dropdown-menu"
const Navbar = () => {
  const { user } = useSelector((store) => store.auth);

  const [logoutUser, { data, isSuccess }] = useLogoutUserMutation();

  const navigate = useNavigate();

  const logoutHandler = async () => {
    await logoutUser();
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message || "User Log Out");
      navigate("/login");
    }
  }, [isSuccess]);
  return (
    <div className=" h-16 dark:bg-[#141414] bg-white border-b dark:border-b-gray-800 border-b-gray-200 fixed top-0 left-0 right-0 duration-300 z-10">
      {/* Desktop */}
      <div className="flex max-w-7xl mx-auto hidden md:flex justify-between items-center gap-4 h-full">
        <div>
          <Link to='/'>
            {" "}
            <h1 className="ml-4 hidden md:block font-extrabold text-4xl font-[Modern_Antiqua]">
              Think<span className="text-purple-500">Stack</span>
            </h1>
          </Link>
        </div>

        {/* user icon and theme-toggle icon */}
        <div className="flex items-center gap-8">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage
                    src={user?.photoUrl || "https://github.com/shadcn.png"}
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link to="my-learning">My Learning</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={logoutHandler}>
                  Log Out
                </DropdownMenuItem>
                {user.role === "instructor" && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem><Link to='/admin/dashboard'>Dashboard</Link></DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="outline">
                <Link to="login">Login</Link>
              </Button>
              <Button>
                <Link to="login">Signup</Link>
              </Button>
            </div>
          )}

          <ModeToggle />
        </div>
      </div>
      {/* Mobile Device */}

      <div className="flex md:hidden items-center justify-center px-4 h-full ">
        <h1 className="font-extrabold text-4xl tracking-tight leading-tight text-white font-[Modern_Antiqua]">
          Think<span className="text-purple-600">Stack</span>
        </h1>

        <MobileNavbar />
      </div>
    </div>
  );
};

export default Navbar;

const MobileNavbar = () => {
  const [logoutUser, { data, isSuccess }] = useLogoutUserMutation();
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  const logoutHandler = async () => {
    await logoutUser();
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message || "User Log Out");
      navigate("/login");
    }
  }, [isSuccess]);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="ml-auto rounded-full hover:bg-gray-200" variant="outline">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader className="flex flex-row items-center justify-between mt-2 mr-12">
          <SheetTitle>
            <Link to="/">ThinkStack</Link>
          </SheetTitle>
          <ModeToggle />
        </SheetHeader>
         <SheetDescription className="sr-only">
    Mobile navigation menu with links and logout
  </SheetDescription>

        <nav className="flex flex-col space-y-4 justify-center items-center mt-10">
          {user ? (
            <>
              <Link to="/my-learning">My Learning</Link>
              <Link to="/profile">Edit Profile</Link>
              <Button onClick={logoutHandler} variant="outline" className="w-full">
                Log Out
              </Button>
              {user.role === "instructor" && (
                <Link to="/admin/dashboard">
                  <Button variant="default" className="w-full">Dashboard</Button>
                </Link>
              )}
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="outline" className="w-full">Login</Button>
              </Link>
              <Link to="/login">
                <Button variant="default" className="w-full">Signup</Button>
              </Link>
            </>
          )}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

