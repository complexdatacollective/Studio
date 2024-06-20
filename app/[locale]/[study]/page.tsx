import { getTranslations } from 'next-intl/server';
import { getStudyBySlug } from '~/server/queries/studies';
import EditStudyForm from './_components/EditStudyForm';

export default async function StudyPage({
  params,
}: {
  params: { study: string };
}) {
  const t = await getTranslations('StudyPage');
  const study = await getStudyBySlug(params.study);

  if (!study) {
    return <div>Study not found</div>;
  }

  return (
    <div className="flex flex-col p-12">
      <h1 className="pb-4 text-4xl">{t('title')}</h1>
      <p>description: {study?.description}</p>
      <EditStudyForm study={study} />
    </div>
  );
}
