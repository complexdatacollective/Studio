'use client';

import { createProject } from '~/server/actions/projects';
import { Button } from '~/components/ui/Button';
import { useTranslations } from 'next-intl';

export default function CreateProjectForm({ orgSlug }: { orgSlug: string }) {
  const t = useTranslations('CreateProjectForm');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    formData.append('orgSlug', orgSlug);

    try {
      await createProject(formData);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex max-w-lg flex-col space-y-2 rounded-lg border border-slate-400 p-4"
    >
      <h2 className="text-lg font-semibold">{t('formTitle')}</h2>
      <label htmlFor="projectName" className="text-sm">
        {t('projectNameInputLabel')}
      </label>
      <input
        className="rounded-md border border-slate-200 p-2 text-slate-600"
        type="text"
        id="projectName"
        name="projectName"
        placeholder={t('projectNameInputPlaceholder')}
      />
      <Button type="submit">{t('formButton')}</Button>
    </form>
  );
}
