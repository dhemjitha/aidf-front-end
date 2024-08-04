import { Button } from "@/components/ui/button";
import { useUser, SignedIn, UserButton } from "@clerk/clerk-react";
import { useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

function AdminMainLayout() {
  const { user, isLoaded, isSignedIn } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    if (!isSignedIn) {
      return navigate("/sign-in");
    }

    if (user?.publicMetadata?.role !== "admin") {
      return navigate("/");
    }
  }, [isLoaded, isSignedIn, navigate, user]);

  return (
    <div>
      <div className="relative border-b-transparent">
        <nav className="flex py-12 justify-between items-center">
        <div>
            <Link to={"/"} className="text-4xl font-medium text-underlay-1">
                HirelyAI
            </Link>
        </div>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </nav>
      </div>
      <div className="flex justify-end gap-x-4 items-center py-4">
        <Link to="/admin/jobs">Job Posts</Link>
        <Button asChild>
          <Link to="/admin/job/create">Post A Job</Link>
        </Button>
      </div>
      <Outlet />
    </div>
  );
}

export default AdminMainLayout;
