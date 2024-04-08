'use client';

import { api } from '~/convex/_generated/api';
import {
  useMutationWithAuth,
  useSignUpSignIn,
} from '@convex-dev/convex-lucia-auth/react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

export function AuthForm() {
  const { flow, toggleFlow, error, onSubmit } = useSignUpSignIn({
    signIn: useMutationWithAuth(api.users.signIn),
    signUp: useMutationWithAuth(api.users.signUp),
  });

  if (error !== undefined) {
    console.error(error);
  }
  return (
    <div className='flex flex-col items-center gap-4 px-20'>
      <form
        className='flex w-[18rem] flex-col'
        onSubmit={(event) => {
          void onSubmit(event);
        }}
      >
        <label htmlFor='username'>Email</label>
        <Input name='email' id='email' className='mb-4' />
        <label htmlFor='password'>Password</label>
        <Input
          type='password'
          name='password'
          id='password'
          className='mb-4 '
        />
        <Button type='submit'>
          {flow === 'signIn' ? 'Sign in' : 'Sign up'}
        </Button>
      </form>
      <Button variant='link' onClick={toggleFlow}>
        {flow === 'signIn'
          ? "Don't have an account? Sign up"
          : 'Already have an account? Sign in'}
      </Button>
      <div className='text-sm font-medium text-red-500'>
        {error !== undefined
          ? flow === 'signIn'
            ? 'Could not sign in, did you mean to sign up?'
            : 'Could not sign up, did you mean to sign in?'
          : null}
      </div>
    </div>
  );
}
