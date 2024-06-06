export default function ProjectPage({
  params,
}: {
  params: { org: string; project: string };
}) {
  const { project } = params;

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="text-2xl">Project Page</div>
      <div>slug: {project}</div>
    </main>
  );
}
