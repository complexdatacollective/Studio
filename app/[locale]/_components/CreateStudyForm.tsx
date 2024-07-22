import { createStudy } from '~/server/actions/study';
import { getTranslations } from 'next-intl/server';
import { SubmitButton } from '~/components/form/SubmitButton';
import Heading from '~/components/typography/Heading';
import { Input } from '~/components/ui/form/Input';

export default async function CreateStudyForm() {
  const t = await getTranslations('CreateStudyForm');

  return (
    <section className="rounded-lg border p-4">
      <Heading variant="h2">{t('formTitle')}</Heading>
      <form action={createStudy}>
        <Input
          className="mb-4"
          label={t('inputLabel')}
          type="text"
          id="studyName"
          name="studyName"
          placeholder={t('inputPlaceholder')}
        />
        <SubmitButton>{t('formButton')}</SubmitButton>
      </form>
    </section>
  );
}
