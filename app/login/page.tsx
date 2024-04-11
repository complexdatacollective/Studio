'use client';

import { Typography } from '~/components/Typography';
import { api } from '~/convex/_generated/api';
import { useQueryWithAuth } from '~/hooks/useAuth';
import authHelper from '~/utils/authHelper';

export default function Login() {
  const user = useQueryWithAuth(api.users.get, {});

  // convex suggests using undefined to check if the user is still loading
  // https://docs.convex.dev/production/best-practices#check-for-undefined-to-determine-if-a-query-is-loading
  if (user === undefined) {
    return <div>Loading...</div>;
  }
  authHelper({
    user,
  });

  return (
    <div className='flex flex-col p-12'>
      <Typography variant='h2'>Login Page</Typography>
      <Typography variant='h4'>Login or create an account!</Typography>
    </div>
  );
}
