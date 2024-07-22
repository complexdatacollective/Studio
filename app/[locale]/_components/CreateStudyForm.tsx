import { createStudy } from '~/server/actions/study';
import { getTranslations } from 'next-intl/server';
import { SubmitButton } from '~/components/form/SubmitButton';
import { Input } from '~/components/ui/form/Input';
import Section from '~/components/layout/Section';

export default async function CreateStudyForm() {
  const t = await getTranslations('CreateStudyForm');

  return (
    <form action={createStudy}>
      <Section
        title={t('formTitle')}
        Footer={<SubmitButton>{t('formButton')}</SubmitButton>}
      >
        <Input
          className="mb-4"
          label={t('inputLabel')}
          type="text"
          id="studyName"
          name="studyName"
          placeholder={t('inputPlaceholder')}
        />
      </Section>
    </form>
  );
}
