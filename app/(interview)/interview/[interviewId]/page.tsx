export default function InterviewPage({
  params,
}: {
  params: { interviewId: string };
}) {
  return (
    <div>
      <h1>Interview Page</h1>
      <p>Interview ID: {params.interviewId}</p>
    </div>
  );
}
