import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useUser, SignedIn, UserButton } from "@clerk/clerk-react";
import { Clock } from "lucide-react";
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
        <div className="mb-6">
          <Alert variant="default" className="bg-blue-50 border-blue-200">
            <Clock className="h-5 w-5" style={{ color: 'black' }} />
            <AlertTitle className="text-blue-900">Demo Notice</AlertTitle>
            <AlertDescription className="text-blue-700">
              For demonstration purposes, the Admin Dashboard is currently accessible to all users through a universal test account. Please note that this is temporary and subject to change.
            </AlertDescription>
          </Alert>
        </div>
      <Outlet />
    </div>
  );
}

export default AdminMainLayout;
