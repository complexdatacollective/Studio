import { getServerPath } from '~/lib/serverUtils';
import { TestAction } from './_actions';
import Form from './_components/Form';
import {
  TestAuthedActionButton,
  TestAdminActionButton,
} from './_components/TestAuthedActionButton';
import PageHeader from '~/components/typography/PageHeader';
import Paragraph from '~/components/typography/Paragraph';

export default function TestPage() {
  const serverPath = getServerPath();
  return (
    <div>
      <PageHeader
        headerText="Test Authed Actions"
        subHeaderText="This page demonstrates the use of authenticated server actions. Delete
        this page when work is complete."
      />
      <Paragraph>Server Path: {serverPath}</Paragraph>
      {/* <TestAuthedActionButton />
      <TestAdminActionButton /> */}
      <Form
        title="Form Requiring Admin Role"
        description="This form uses a server action that requires the user to be an admin in the current study."
        helpText="Some help text can go here, optionally."
        inputAttrs={{
          label: 'Additional data to pass to the action',
          name: 'name',
          type: 'text',
          defaultValue: 'This is a default value',
        }}
        handleSubmit={TestAction}
      />
    </div>
  );
}
