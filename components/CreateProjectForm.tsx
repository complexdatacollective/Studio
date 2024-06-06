'use client';

import { createProject } from '~/actions/projects';

export default function CreateProjectForm({ orgSlug }: { orgSlug: string }) {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    formData.append('orgSlug', orgSlug);

    try {
      await createProject(formData);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
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
      <button className="my-2 border border-red-400" type="submit">
        Create project
      </button>
    </form>
  );
}
