import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/clerk-react";
import { MenuIcon } from "lucide-react";
import { useState } from "react";

function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const { user } = useUser();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative top-0 border-b-transparent shadow-lg">
      <nav className="flex py-12 justify-between items-center">

        <div>
          <Link to={"/"} className="text-4xl font-medium text-underlay-1">
            HirelyAI
          </Link>
        </div>
        <div className="flex items-center">
          <div className="hidden md:flex justify-center gap-x-6 items-center">
            <Link to="/">Home</Link>
            <SignedIn>
              <UserButton />
            </SignedIn>
            {user?.publicMetadata?.role == "admin" && (
              <Link to="/admin" onClick={toggleMenu}>
                <Button className="w-full py-4">
                  Admin Dashboard
                </Button>
              </Link>
            )}
            <SignedOut>
              <Link to="/sign-in">Sign In</Link>
              <Button asChild>
                <Link to="/sign-up">Sign Up</Link>
              </Button>
            </SignedOut>
          </div>
          <div className="md:hidden">
            <Button onClick={toggleMenu} className="focus:outline-none">
              <MenuIcon className="w-6 h-6" />
            </Button>
          </div>
        </div>


        <div
          className={`${isOpen ? "block" : "hidden"
            } absolute top-full right-0 mt-2 w-full md:hidden bg-muted shadow-lg rounded`}>

          <div className="flex flex-col items-center p-4 space-y-4">
            <Link to="/" className="w-full text-center">
              Home
            </Link>
            <SignedIn>
              <UserButton className="w-full text-center" />
              {user?.publicMetadata?.role == "admin" && (
              <Link to="/admin" onClick={toggleMenu}>
                <Button className="w-full py-4">
                  Admin Dashboard
                </Button>
              </Link>
            )}
            </SignedIn>
            <SignedOut>
              <Link to="/sign-in" className="w-full text-center">
                Sign In
              </Link>
              <Button className="w-full">
                <Link to="/sign-up">Sign Up</Link>
              </Button>
            </SignedOut>
          </div>


        </div>
      </nav>
    </div>
  );
}

export default Navigation;
