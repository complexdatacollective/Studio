import { createOrganization } from '~/server/actions/organizations';
import { Button } from '~/components/ui/Button';
import { getTranslations } from 'next-intl/server';
import { Input } from '~/components/ui/form/Input';
import Heading from '~/components/typography/Heading';

export default async function CreateOrgForm() {
  const t = await getTranslations('CreateOrgForm');

  return (
    <form action={createOrganization}>
      <Heading>{t('formTitle')}</Heading>
      <Input
        type="text"
        label={t('orgNameInputLabel')}
        id="orgName"
        name="orgName"
        placeholder={t('orgNameInputPlaceholder')}
      />
      <Button type="submit" variant="secondary">
        {t('formButton')}
      </Button>
    </form>
  );
}
