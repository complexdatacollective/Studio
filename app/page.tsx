import CreateOrgForm from "~/components/CreateOrgForm";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="text-2xl">Studio MVP</div>
      <CreateOrgForm />
    </main>
  );
}
