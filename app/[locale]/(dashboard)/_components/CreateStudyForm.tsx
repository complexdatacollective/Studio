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
import Form from '~/components/ui/form/Form';

export default async function CreateStudyForm() {
  const t = await getTranslations('Components.CreateStudyForm');

  return (
    <Section title={t('FormTitle')}>
      <Form action={createStudy}>
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
        <Form.Footer
          primaryAction={<SubmitButton>{t('FormButton')}</SubmitButton>}
        />
      </Form>
    </Section>
  );
}
