export default function Page({ params }: { params: { org: string } }) {
  const { org } = params;
  return (
    <div className="flex flex-col p-12">
      <div className="text-4xl">Organization Settings Page</div>
      <div>slug: {org}</div>
    </div>
  );
}
