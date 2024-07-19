import JobCard from "@/components/shared/JobCard";
import { getJobs } from "@/lib/services/api/jobs";
import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import * as React from "react"

function JobSection() {
  const [jobs, setJobs] = useState([]);
  const [isJobsLoading, setIsJobsLoading] = useState(false);
  const [isJobsError, setIsJobsError] = useState(false);

  useEffect(() => {
    setIsJobsLoading(true);
    getJobs()
      .then((data) => {
        setJobs(data);
      })
      .catch(() => {
        setIsJobsError(true);
      })
      .finally(() => {
        setIsJobsLoading(false);
      });
  }, []);

  if (isJobsLoading) {
    return (
      <section className="py-8">
        <h2>Available Jobs</h2>
        <div className="mt-4 flex flex-col gap-y-8">
          <ProgressDemo/>
          <Button className="bg-white" disabled>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Please wait
          </Button>
        </div>
      </section>
    );
  }

  if (isJobsError) {
    return (
      <section className="py-8">
        <h2>Available Jobs</h2>
        <div className="mt-4 flex flex-col gap-y-8">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>Error while fetching data...</AlertDescription>
          </Alert>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8">
      <h2>Available Jobs</h2>
      <div className="mt-4 flex flex-col gap-y-8">
        {jobs.map((job) => {
          return (
            <JobCard
              key={job._id}
              title={job.title}
              _id={job._id}
              type={job.type}
              location={job.location}
            />
          );
        })}
      </div>
    </section>
  );
}

export function ProgressDemo() {
  const [progress, setProgress] = React.useState(13)

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500)
    return () => clearTimeout(timer)
  }, [])

  return <Progress value={progress}/>
}


export default JobSection;
