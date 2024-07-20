export const getJobApllicationsForJob = async (id) => {
  // Check if window.Clerk and window.Clerk.session are available
  if (!window.Clerk || !window.Clerk.session) {
    throw new Error("Clerk is not initialized properly.");
  }

  const token = await window.Clerk.session.getToken();

  const res = await fetch(`https://aidf-back-end-production-a419.up.railway.app/jobApplications?jobid=${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();
  return data;
};

export const getJobApplicationById = async (id) => {

  if (!window.Clerk || !window.Clerk.session) {
    throw new Error("Clerk is not initialized properly.");
  }

  const token = await window.Clerk.session.getToken();

  const res = await fetch(`https://aidf-back-end-production-a419.up.railway.app/jobApplications/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  return data;
};

export const createJobApplication = async ({
  userId,
  fullName,
  job,
  answers,
}) => {
  const token = await window.Clerk.session.getToken();

  await fetch("https://aidf-back-end-production-a419.up.railway.app/jobApplications", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      userId: userId,
      fullName: fullName,
      job,
      answers,
    }),
  });
};



export const deleteJobApplication = async (id) => {
  const token = await window.Clerk.session.getToken();

  const res = await fetch(`https://aidf-back-end-production-a419.up.railway.app/jobApplications/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to delete job application");
  }

  return await res.json();
};
