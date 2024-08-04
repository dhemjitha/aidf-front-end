import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { getJobApplicationById } from "@/lib/services/api/jobApplications";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { deleteJobApplication } from "@/lib/services/api/jobApplications";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ConfirmDeletionToast from "@/pages/home/components/ConfirmDeletionToast";
import { useSession } from "@clerk/clerk-react";

function AdminJobApplicationPage() {
  const [jobApplication, setJobApplication] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { applicationId } = useParams();
  const navigate = useNavigate();
  const { session } = useSession();

  useEffect(() => {
    if (!applicationId || !session) return;

    const fetchJobApplicationData = async () => {
      try {
        const data = await getJobApplicationById(applicationId, session);
        setJobApplication(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching job application:", error);
        setIsLoading(false);
      }
    };

    fetchJobApplicationData();
  }, [applicationId, session]);

  if (isLoading) {
    return <div className="mt-3 animate-pulse">Loading...</div>;
  }

  const handleDelete = async (applicationId) => {
    toast(
      ({ closeToast }) => (
        <ConfirmDeletionToast
          onConfirm={async () => {
            try {
              await deleteJobApplication(applicationId);
              console.log("Job application deleted successfully");

              toast.success("Job application deleted successfully!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });

              // Redirect to previous page :)
              navigate(-1);
            } catch (error) {
              console.error("Failed to delete job application:", error);

              toast.error("Error deleting job application. Please try again.", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            }
            closeToast();
          }}
          onCancel={closeToast}
        />
      ),
      {
        autoClose: false,
        closeOnClick: false,
        draggable: false,
      }
    );
  };

  return (
    <div className="flex flex-col gap-y-4">
      <Card className="bg-foreground">
        <CardHeader className="flex-row items-center gap-x-4">
          <CardTitle>{jobApplication?.fullName}</CardTitle>
          <Badge
            className={cn({
              "bg-red-500":
                jobApplication?.rating?.toLocaleLowerCase() === "bad",
              "bg-orange-400":
                jobApplication?.rating?.toLocaleLowerCase() === "moderate",
              "bg-teal-500":
                jobApplication?.rating?.toLocaleLowerCase() === "good",
            })}
          >
            {jobApplication?.rating}
          </Badge>
        </CardHeader>
      </Card>

      <Card className="p-8 bg-gradient-to-r from-white to-gray-50 shadow-xl rounded-2xl border border-gray-300">
        <h2 className="text-2xl font-bold mb-6 text-center text-indigo-600">
          Job Application Answers
        </h2>
        {jobApplication.answers.map((answer, i) => (
          <p
            key={i}
            className="text-gray-900 text-lg mb-4 p-4 bg-gray-100 rounded-lg shadow-sm"
          >
            {answer}
          </p>
        ))}
      </Card>

      <div>
        <Button variant="link" asChild>
          <Link to={"/admin/jobs"}>Back</Link>
        </Button>
        <Button
          onClick={() => handleDelete(applicationId)}
          type="submit"
          variant="destructive"
        >
          Reject
        </Button>
      </div>
      <ToastContainer />
    </div>
  );
}

export default AdminJobApplicationPage;
