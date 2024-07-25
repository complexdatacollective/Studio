import { createStudy } from '~/server/actions/study';
import { getTranslations } from 'next-intl/server';
import { SubmitButton } from '~/components/form/SubmitButton';
import { Input } from '~/components/ui/form/Input';
import Section from '~/components/layout/Section';
import {
  Select,
  SelectContent,
  SelectValue,
  SelectTrigger,
  SelectItem,
} from '~/components/ui/select';
import { Role } from '@prisma/client';

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
          required
        />
        <Select id="role" name="role" required label="Select a role">
          <SelectTrigger>
            <SelectValue placeholder={t('roleSelectPlaceholder')} />
          </SelectTrigger>
          <SelectContent>
            {Object.values(Role).map((role) => (
              <SelectItem key={role} value={role}>
                {role}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Section>
    </form>
  );
}
