'use client';

import React from 'react';
import { signout } from '~/server/actions/auth';
import { Button } from '~/components/ui/Button';
import { useTranslations } from 'next-intl';

const SignOutBtn = () => {
  const t = useTranslations('SignOutBtn');

  return (
    <Button className="my-2" onClick={() => void signout()}>
      {t('buttonLabel')}
    </Button>
  );
};

export default SignOutBtn;
