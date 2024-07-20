export const getJobs = async () => {
  const res = await fetch(
    "https://aidf-back-end-production-a419.up.railway.app/jobs",
    {
      method: "GET",
    }
  );
  const data = await res.json();
  return data;
};

export const getJobById = async (id) => {
  if (!window.Clerk || !window.Clerk.session) {
    throw new Error("Clerk is not initialized properly.");
  }

  const token = await window.Clerk.session.getToken();

  // console.log("Fetching job with ID:", id);
  // console.log("Using token:", token);

  const res = await fetch(
    `https://aidf-back-end-production-a419.up.railway.app/jobs/${id}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) {
    const errorMessage = await res.text(); // Get the error message from the server
    console.error("Server responded with status:", res.status, errorMessage);
    throw new Error(
      `Failed to fetch job details. Server responded with status ${res.status}. ${errorMessage}`
    );
  }

  const data = await res.json();
  return data;
};


export const createJob = async ({
  title,
  description,
  type,
  location,
  questions,
}) => {
  const token = await window.Clerk.session.getToken();

  await fetch("https://aidf-back-end-production-a419.up.railway.app/jobs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      title,
      description,
      type,
      location,
      questions,
    }),
  });
};

export const deleteJobById = async (id) => {
  if (!window.Clerk || !window.Clerk.session) {
    throw new Error("Clerk is not initialized properly.");
  }

  const token = await window.Clerk.session.getToken();

  const res = await fetch(
    `https://aidf-back-end-production-a419.up.railway.app/jobs/${id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) {
    const errorMessage = await res.text(); // Optionally get more details about the error
    throw new Error(`Failed to delete job. Server responded with status ${res.status}. ${errorMessage}`);
  }

  return { success: true };
};

