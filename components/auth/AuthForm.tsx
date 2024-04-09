'use client';

import { api } from '~/convex/_generated/api';
import { useSetSessionId } from '~/providers/SessionProvider';
import { useMutationWithAuth } from '../../lib/withAuthWrappers';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { useState } from 'react';

export function AuthForm() {
  const setSessionId = useSetSessionId();

  const [flow, setFlow] = useState<'signIn' | 'signUp'>('signIn');
  const signIn = useMutationWithAuth(api.users.signIn);
  const signUp = useMutationWithAuth(api.users.signUp);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    try {
      const sessionId = await (flow === 'signIn' ? signIn : signUp)({
        email: (data.get('email') as string | null) ?? '',
        password: (data.get('password') as string | null) ?? '',
      });
      setSessionId(sessionId);
    } catch {
      alert(
        flow === 'signIn' ? 'Invalid email or password' : 'Email already in use'
      );
    }
  };

  return (
    <div className='flex flex-col items-center gap-4 px-20'>
      <form
        className='flex w-[18rem] flex-col'
        onSubmit={(event) => {
          void handleSubmit(event);
        }}
      >
        <Label>Email</Label>
        <Input name='email' id='email' className='mb-4' />
        <Label>Password</Label>
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
      <Button
        variant='link'
        onClick={() => {
          setFlow(flow === 'signIn' ? 'signUp' : 'signIn');
        }}
      >
        {flow === 'signIn'
          ? "Don't have an account? Sign up"
          : 'Already have an account? Sign in'}
      </Button>
    </div>
  );
}
