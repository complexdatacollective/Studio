import { createStudy } from '~/server/actions/study';
import { getTranslations } from 'next-intl/server';
import { SubmitButton } from '~/components/ui/form/SubmitButton';
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
  const t = await getTranslations('Components.CreateStudyForm');

  return (
    <Section
      title={t('FormTitle')}
      footer={<SubmitButton>{t('FormButton')}</SubmitButton>}
    >
      <form action={createStudy} id="test" className="flex flex-col gap-4">
        <Input
          label={t('InputLabel')}
          type="text"
          id="studyName"
          name="studyName"
          placeholder={t('InputPlaceholder')}
          required
        />
        <Select id="role" name="role" required label={t('RoleSelectLabel')}>
          <SelectTrigger>
            <SelectValue placeholder={t('RoleSelectPlaceholder')} />
          </SelectTrigger>
          <SelectContent>
            {Object.values(Role).map((role) => (
              <SelectItem key={role} value={role}>
                {role}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </form>
    </Section>
  );
}
