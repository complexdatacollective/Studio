'use client';

import React from 'react';
import { logout } from '~/server/actions/auth';
import { useTranslations } from 'next-intl';
import { SubmitButton } from '~/components/ui/form/SubmitButton';

export default function SignOutBtn() {
  const t = useTranslations('SignOutBtn');

  return (
    <form action={logout}>
      <SubmitButton>{t('buttonLabel')}</SubmitButton>
    </form>
  );
}
