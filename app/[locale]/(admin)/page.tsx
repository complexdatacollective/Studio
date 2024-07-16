import { getStudies } from '~/server/queries/studies';
// import CreateStudyForm from '../_components/CreateStudyForm';
import { requirePageAuth } from '~/lib/auth';
import SignOutBtn from '../../_components/SignOutBtn';
import { routes } from '~/lib/routes';
import { getTranslations } from 'next-intl/server';
import { Link } from '~/lib/localisation/navigation';

export default async function Home() {
  await requirePageAuth();
  const t = await getTranslations('Home');

  const studies = await getStudies();
  return (
    <main className="flex flex-col p-12">
      <h1 className="pb-4 text-4xl">{t('title')}</h1>
      {/* <CreateStudyForm /> */}
      <h2 className="pb-4 text-2xl">{t('allStudiesHeading')}</h2>
      <div className="text-blue-700 flex flex-col underline">
        {studies.map((study) => (
          <Link
            key={study.id}
            href={routes.studyDashboard({ study: study.slug })}
          >
            {study.name}
          </Link>
        ))}
      </div>

      <SignOutBtn />
    </main>
  );
}
