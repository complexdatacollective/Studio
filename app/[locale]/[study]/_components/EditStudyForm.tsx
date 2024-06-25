'use client';

import { updateStudy } from '~/server/actions/study';
import { useTranslations } from 'next-intl';
import { createAuthedAction } from '~/lib/createAuthedAction';
import { type Study } from '@prisma/client';
import { Button } from '~/components/ui/Button';

export default function EditStudyForm({ study }: { study: Study }) {
  const t = useTranslations('EditStudyForm');

  const authedEditStudy = createAuthedAction({
    action: updateStudy,
    publicStudyId: study.publicId,
    requiredRoles: ['STAFF'],
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const studyDescription = formData.get('studyDescription');

    if (!studyDescription) {
      return;
    }

    try {
      await authedEditStudy(study.slug, formData);
      console.log('Study description updated');
    } catch (error) {
      console.error('Failed to update study description', error);
    }
  };

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className="border-slate-400 flex max-w-lg flex-col space-y-2 rounded-lg border p-4"
    >
      <h2 className="text-lg font-semibold">{t('formTitle')}</h2>
      <label htmlFor="studyDescription" className="text-sm">
        {t('inputLabel')}
      </label>
      <input
        className="border-slate-200 text-slate-600 rounded-md border p-2"
        type="text"
        id="studyDescription"
        name="studyDescription"
        placeholder={t('inputPlaceholder')}
      />
      <Button type="submit">{t('formButton')}</Button>
    </form>
  );
}
