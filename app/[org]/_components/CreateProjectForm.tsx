'use client';

import { createProject } from '~/actions/projects';
import Button from '~/components/Button';

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
    <form
      onSubmit={handleSubmit}
      className="flex max-w-lg flex-col space-y-2 rounded-lg border border-slate-400 p-4"
    >
      <h2 className="text-lg font-semibold">Create Project</h2>
      <label htmlFor="projectName" className="text-sm">
        Project Name
      </label>
      <input
        className="rounded-md border border-slate-200 p-2 text-slate-600"
        type="text"
        id="projectName"
        name="projectName"
        placeholder="Studio"
      />
      <Button>Create project</Button>
    </form>
  );
}
