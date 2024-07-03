import { getInterviewById } from '~/server/queries/interviews';
import InterviewShell from '../_components/InterviewShell';

export default async function Page({
  params: { interviewId },
  searchParams,
}: {
  params: { interviewId: string };
  searchParams: Record<string, string | string[] | undefined>;
}) {
  let stage;
  if (!searchParams.stage) {
    stage = 0;
  } else {
    stage = parseInt(searchParams.stage as string);
  }

  const interviewData = await getInterviewById({ interviewId });
  if (!interviewData) {
    return <div>Interview not found</div>;
  }
  return <InterviewShell interview={interviewData} currentStage={stage} />;
}
