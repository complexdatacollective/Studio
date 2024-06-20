import { createStudy } from '~/server/actions/study';
import { getTranslations } from 'next-intl/server';
import { SubmitButton } from '~/components/form/SubmitButton';
import { createAuthedAction } from '~/lib/createAuthedAction';

export default async function CreateStudyForm() {
  const t = await getTranslations('CreateStudyForm');

  const authedCreateStudy = createAuthedAction(createStudy, ['ADMIN']);

  return (
    <form
      action={await authedCreateStudy}
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
