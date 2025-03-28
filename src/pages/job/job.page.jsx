import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useUser, useAuth } from "@clerk/clerk-react";
import { Briefcase, MapPin } from "lucide-react";
import { useState, useEffect } from "react";
import { Navigate, useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const getJob = async (id, token) => {
  const res = await fetch(
    `https://aidf-back-end.vercel.app/jobs/${id}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch job details");
  }

  const job = await res.json();
  return job;
};

const createJob = async (jobApplication, token, navigate) => {
  try {
    const response = await fetch(
      `https://aidf-back-end.vercel.app/jobApplications`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(jobApplication),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to create job application");
    }

    toast.success("Job application submitted successfully!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      onClose: () => {
        navigate(-1);
      }
    });
    
  } catch (error) {
    toast.error("Error submitting job application. Please try again.", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
};

function JobPage() {
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const params = useParams();
  const navigate = useNavigate();

  const { isLoaded, isSignedIn, user } = useUser();
  const { getToken } = useAuth();

  useEffect(() => {
    const fetchJob = async () => {
      setLoading(true);
      try {
        const token = await getToken();
        const data = await getJob(params.id, token);
        setJob(data);
        setError(null);
      } catch (err) {
        setError("Failed to fetch job details");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (isLoaded) {
      fetchJob();
    }
  }, [params.id, isLoaded, getToken]);

  const [formData, setFormData] = useState({
    fullName: "",
    a1: "",
    a2: "",
    a3: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = await getToken();
      await createJob(
        {
          fullName: formData.fullName,
          answers: [formData.a1, formData.a2, formData.a3],
          job: params.id,
          userId: user.id,
        },
        token,
        navigate
      );
    } catch (err) {
      console.error(err);
    }
  };

  if (!isLoaded) {
    return <div className="mt-3 animate-pulse">Loading...</div>;
  }

  if (!isSignedIn) {
    return <Navigate to="/sign-in" />;
  }

  if (loading) {
    return <div className="mt-3 animate-pulse">Loading job details...</div>;
  }

  if (error) {
    return <div className="mt-3 text-red-500">{error}</div>;
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

      <Separator />

      <form className="py-8 flex flex-col gap-y-8" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-y-4">
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            required
            value={formData.fullName}
            onChange={(event) =>
              setFormData({ ...formData, fullName: event.target.value })
            }
          />
        </div>

        <div>
          <div className="flex flex-col gap-y-4">
            <Label htmlFor="a1">{job?.questions[0]}</Label>
            <Textarea
              id="a1"
              required
              value={formData.a1}
              onChange={(event) =>
                setFormData({ ...formData, a1: event.target.value })
              }
            />
          </div>
        </div>

        <div>
          <div className="flex flex-col gap-y-4">
            <Label htmlFor="a2">{job?.questions[1]}</Label>
            <Textarea
              id="a2"
              required
              value={formData.a2}
              onChange={(event) =>
                setFormData({ ...formData, a2: event.target.value })
              }
            />
          </div>
        </div>

        <div>
          <div className="flex flex-col gap-y-4">
            <Label htmlFor="a3">{job?.questions[2]}</Label>
            <Textarea
              id="a3"
              required
              value={formData.a3}
              onChange={(event) =>
                setFormData({ ...formData, a3: event.target.value })
              }
            />
          </div>
        </div>

        <div className="flex gap-x-4 items-center">
          <Button type="submit" className="bg-card text-card-foreground w-fit">
            Submit
          </Button>
          <Button
            type="button"
            onClick={() =>
              setFormData({
                fullName: "",
                a1: "",
                a2: "",
                a3: "",
              })
            }
            className="w-fit"
            variant="outline"
          >
            Clear
          </Button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}

export default JobPage;