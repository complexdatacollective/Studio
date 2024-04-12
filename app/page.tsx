import { Typography } from '~/components/Typography';
import { pageAuthorization } from '~/lib/pageAuthorization';

export default function Home() {
  pageAuthorization({});

  return (
    <div className='flex flex-col p-12'>
      <Typography variant='h2'>Personal Account Dashboard</Typography>
      <Typography variant='h4'>
        Select an Organization from the top navigation bar to view its projects.
      </Typography>
    </div>
  );
}
