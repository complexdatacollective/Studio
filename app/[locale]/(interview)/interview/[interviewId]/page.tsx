import { getInterviewById } from '~/server/queries/interviews';
import InterviewShell from '../../../../../components/interview/ui/InterviewShell';
import { redirect } from '~/lib/localisation/navigation';
import { headers } from 'next/headers';
import { getBestMatch, getLocalisedString } from '~/lib/localisation/utils';

export default async function Page({
  params: { interviewId },
  searchParams,
}: {
  params: { interviewId: string };
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const headersList = headers();
  const userLocales = headersList.get('accept-language') ?? '';
  // eslint-disable-next-line no-console
  console.log('userLocales', userLocales);
  const cleanedUserLocales = userLocales
    .split(',')
    .map((locale) => locale.split(';')[0].trim())
    .filter((locale) => /^[a-zA-Z-]+$/.test(locale));

  const bestMatch = getBestMatch(['en', 'fr'], cleanedUserLocales);

  // eslint-disable-next-line no-console
  console.log('localizedString', bestMatch);

  // TODO: store this bestMatch, allow override with interview-specific lang switcher

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
