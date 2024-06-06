export default function Page({ params }: { params: { org: string } }) {
  const { org } = params;
  return (
    <div className="flex min-h-screen flex-col items-center p-24">
      <div className="text-2xl">Organization Settings Page</div>
      <div>slug: {org}</div>
    </div>
  );
}
