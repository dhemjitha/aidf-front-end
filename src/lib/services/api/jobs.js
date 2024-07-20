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

  const res = await fetch(
    `https://aidf-back-end-production-a419.up.railway.app/${id}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) {
    const errorMessage = await res.text(); // Get the error message from the server
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

  await fetch("https://aidf-back-end-production-a419.up.railway.app", {
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
  const token = await window.Clerk.session.getToken();

  const res = await fetch(
    `https://aidf-back-end-production-a419.up.railway.app/${id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to delete job");
  }

  return { success: true };
};
