import { updateStudy } from '~/server/actions/study';
import { getTranslations } from 'next-intl/server';
import { SubmitButton } from '~/components/form/SubmitButton';
import { createAuthedAction } from '~/lib/createAuthedAction';
import { type Study } from '@prisma/client';

export default async function EditStudyForm({ study }: { study: Study }) {
  const t = await getTranslations('EditStudyForm');

  const authedEditStudy = createAuthedAction({
    action: updateStudy,
    publicStudyId: study.publicId,
    requiredRoles: ['STAFF'],
  });

  return (
    <form
      // need to pass study.slug to the form action too
      action={await authedEditStudy}
      className="border-slate-400 flex max-w-lg flex-col space-y-2 rounded-lg border p-4"
    >
      <h2 className="text-lg font-semibold">{t('formTitle')}</h2>
      <label htmlFor="studyName" className="text-sm">
        {t('inputLabel')}
      </label>
      <input
        className="border-slate-200 text-slate-600 rounded-md border p-2"
        type="text"
        id="studyName"
        name="studyName"
        placeholder={t('inputPlaceholder')}
      />
      <SubmitButton>{t('formButton')}</SubmitButton>
    </form>
  );
}
