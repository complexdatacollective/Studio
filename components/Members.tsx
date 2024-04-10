import { Separator } from './ui/separator';
import { Badge } from './ui/badge';
import type { UserWithRole } from '~/shared/types';

export function Members({ members }: { members: UserWithRole[] }) {
  return (
    <div>
      {members.map((user) => (
        <div>
          <div
            key={user._id}
            className='flex flex-row items-center justify-between p-2'
          >
            <div>{user.email}</div>
            <Badge variant='outline'>{user.role}</Badge>
          </div>
          <Separator />
        </div>
      ))}
    </div>
  );
}
