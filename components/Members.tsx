import { Doc } from '../convex/_generated/dataModel';

export function Members({ members }: { members: Doc<'users'>[] }) {
  // todo: get role on organization

  return (
    <div>
      {members.map((user) => (
        <div key={user._id}>
          <div>{user.email}</div>
        </div>
      ))}
    </div>
  );
}
