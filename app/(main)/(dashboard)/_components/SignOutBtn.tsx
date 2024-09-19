'use client';

import React from 'react';
import { logout } from '~/server/actions/auth';
import { useTranslations } from 'next-intl';
import { SubmitButton } from '~/components/ui/form/SubmitButton';

export default function SignOutBtn() {
  const t = useTranslations('Auth.SignOut');

  return (
    <form action={logout}>
      <SubmitButton>{t('ButtonLabel')}</SubmitButton>
    </form>
  );
}
