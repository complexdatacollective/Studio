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

  return (
    <div className="flex flex-col p-12">
      <h1 className="pb-4 text-4xl">{t('title')}</h1>
      {study ? (
        <>
          <h2 className="pb-4 text-2xl">{study.name}</h2>
          <p>description: {study?.description}</p>
          <EditStudyForm study={study} />
        </>
      ) : null}
    </div>
  );
}
