import { createOrganization } from '~/server/actions/organizations';
import Button from '~/components/Button';
import { getTranslations } from 'next-intl/server';

export default async function CreateOrgForm() {
  const t = await getTranslations('CreateOrgForm');

  return (
    <form
      action={createOrganization}
      className="flex max-w-lg flex-col space-y-2 rounded-lg border border-slate-400 p-4"
    >
      <h2 className="text-lg font-semibold">{t('formTitle')}</h2>
      <label htmlFor="orgName" className="text-sm">
        {t('orgNameInputLabel')}
      </label>
      <input
        className="rounded-md border border-slate-200 p-2 text-slate-600"
        type="text"
        id="orgName"
        name="orgName"
        placeholder={t('orgNameInputPlaceholder')}
      />
      <Button type="submit">{t('formButton')}</Button>
    </form>
  );
}
