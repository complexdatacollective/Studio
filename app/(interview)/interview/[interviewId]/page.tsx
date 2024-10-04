import { getInterviewById } from '~/server/queries/interviews';
import InterviewShell from '~/components/interview/ui/InterviewShell';

export default async function Page({
  params: { interviewId },
  searchParams,
}: {
  params: { interviewId: string };
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const stage = parseInt(searchParams.stage as string, 10) || 0;

  const interviewData = await getInterviewById({ interviewId });
  if (!interviewData) {
    return <div>Interview not found</div>;
  }
  return <InterviewShell interview={interviewData} currentStage={stage} />;
}
