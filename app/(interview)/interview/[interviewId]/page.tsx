import { getInterviewById } from '~/server/queries/interviews';
import InterviewShell from '~/components/interview/ui/InterviewShell';

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ interviewId: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const paramsResult = await searchParams;
  const stage = parseInt(paramsResult.stage as string, 10) || 0;
  const { interviewId } = await params;

  const interviewData = await getInterviewById({ interviewId });
  if (!interviewData) {
    return <div>Interview not found</div>;
  }
  return <InterviewShell interview={interviewData} currentStage={stage} />;
}
