import { Button } from '~/components/ui/Button';
import { createAuthedAction } from '~/lib/createAuthedAction';
import { testAuthedAction } from '~/server/actions/study';

export default function TestAuthedActionButton() {
  const authedTestAuthedAction = createAuthedAction({
    action: testAuthedAction,
  });
  return (
    <form action={authedTestAuthedAction}>
      <Button type="submit">Test authed action</Button>
    </form>
  );
}
