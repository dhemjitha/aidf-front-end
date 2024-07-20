import { Separator } from "@/components/ui/separator";
import { getJobApllicationsForJob } from "@/lib/services/api/jobApplications";
import { getJobById, deleteJobById } from "@/lib/services/api/jobs";
import { Briefcase, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import JobApplicationCard from "./components/JobApplicationCard";
import { Button } from "@/components/ui/button";
import { useSession } from '@clerk/clerk-react';

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ConfirmJobDeletionToast from "@/pages/home/components/ConfirmJobDeletionToast";

function AdminJobPage() {
  const [job, setJob] = useState(null);
  const [isJobLoading, setIsJobLoading] = useState(true);
  const [jobApplications, setJobApplications] = useState([]);
  const [isJobApplicationsLoading, setIsJobApplicationsLoading] = useState(true);
  const { id } = useParams();
  const { session } = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobData = async () => {
      try {
        if (!session) {
          throw new Error("Clerk session is not available.");
        }
  
        const jobData = await getJobById(id);
        setJob(jobData);
        setIsJobLoading(false);
      } catch (error) {
        console.error("Error fetching job:", error);
        setIsJobLoading(false);
      }
    };
  
    // Call fetchJobData when session and id are available
    if (session && id) {
      fetchJobData();
    }
  }, [id, session]);
  

  const handleDeleteJob = async () => {
    toast(
      ({ closeToast }) => (
        <ConfirmJobDeletionToast
          onConfirm={async () => {
            try {
              await deleteJobById(id);
              console.log("Job deleted successfully");

              toast.success("Job deleted successfully!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });

              navigate(-1);
            } catch (error) {
              console.error("Failed to delete job:", error);

              toast.error("Error deleting job. Please try again.", {
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

  if (isJobLoading || isJobApplicationsLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>
        <h2>{job?.title}</h2>
        <div className="flex items-center gap-x-4 mt-4">
          <div className="flex items-center gap-x-2">
            <Briefcase />
            <span>{job?.type}</span>
          </div>
          <div className="flex items-center gap-x-2">
            <MapPin />
            <span>{job?.location}</span>
          </div>
        </div>
      </div>
      <div className="mt-4 py-4">
        <p>{job?.description}</p>
      </div>

      <div className="flex justify-start gap-x-4 items-center py-4">
        <Button type="button" variant="destructive" onClick={handleDeleteJob}>
          Delete Job
        </Button>
      </div>

      <Separator />
      <div className="py-8">
        <h2>Job Applications</h2>
        <div className="mt-4 flex flex-col gap-y-4">
          {jobApplications.map((application) => (
            <JobApplicationCard
              key={application._id}
              fullName={application.fullName}
              _id={application._id}
              jobId={id}
            />
          ))}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default AdminJobPage;
