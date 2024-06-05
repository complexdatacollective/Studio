"use client";

import { createProject } from "~/actions/projects";

export default function CreateProjectForm({ orgSlug }: { orgSlug: string }) {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    formData.append("orgSlug", orgSlug);
    createProject(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col border border-black">
      <label htmlFor="projectName">Project Name</label>
      <input
        className="text-slate-600"
        type="text"
        id="projectName"
        name="projectName"
      />
      <button className="border border-red-400 my-2" type="submit">
        Create project
      </button>
    </form>
  );
}
