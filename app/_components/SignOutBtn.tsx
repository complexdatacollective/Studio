'use client';

import React from 'react';
import { signout } from '~/server/actions/auth';
import { Button } from '~/components/ui/button';

const SignOutBtn = () => {
  return (
    <Button className="my-2" onClick={() => void signout()}>
      Sign Out
    </Button>
  );
};

export default SignOutBtn;
