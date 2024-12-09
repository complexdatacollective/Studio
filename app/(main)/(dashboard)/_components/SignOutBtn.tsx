'use client';

import { useTranslations } from 'next-intl';
import { SubmitButton } from '~/components/form/SubmitButton';
import { logout } from '~/server/actions/auth';

export default function SignOutBtn() {
  const t = useTranslations('Auth.SignOut');

  return (
    <form action={logout}>
      <SubmitButton>{t('ButtonLabel')}</SubmitButton>
    </form>
  );
}
