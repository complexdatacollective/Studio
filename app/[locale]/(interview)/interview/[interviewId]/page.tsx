import { getInterviewById } from '~/server/queries/interviews';
import InterviewShell from '../../../../../components/interview/ui/InterviewShell';
import { redirect } from '~/lib/localisation/navigation';
import { headers } from 'next/headers';
import { cookies } from 'next/headers';

export default async function Page({
  params: { interviewId },
  searchParams,
}: {
  params: { interviewId: string };
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const userLanguageHeader = headers().get('accept-language');
  const protocolLanguages: Locale[] = [
    ['en', 'English'],
    ['fr', 'French'],
  ];
  const initialLocale = cookies().get('interviewLocale');

  let stage;
  if (!searchParams.stage) {
    stage = 0;
    redirect(`/interview/${interviewId}?stage=0`);
  } else {
    stage = parseInt(searchParams.stage as string);
  }

  const interviewData = await getInterviewById({ interviewId });
  if (!interviewData) {
    return <div>Interview not found</div>;
  }
  return <InterviewShell interview={interviewData} currentStage={stage} />;
}
