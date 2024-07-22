import {
  TestAuthedActionButton,
  TestAdminActionButton,
} from './_components/TestAuthedActionButton';

export default function TestPage() {
  return (
    <div>
      <h1 className="pb-4 text-4xl">Test Authed Actions</h1>
      <p>This page demonstrates the use of authenticated server actions.</p>
      <TestAuthedActionButton />
      <TestAdminActionButton />
    </div>
  );
}
