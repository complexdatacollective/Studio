/* eslint-disable no-console */
'use client';

import { Button } from '~/components/ui/Button';
import { useDialogStore } from '~/lib/dialogs/dialog-store-provider';

const ShowDialog = () => {
  const { openDialog } = useDialogStore((state) => state);

  const createErrorDialog = () => {
    openDialog({
      type: 'Error',
      title: 'Error Dialog',
      error: {
        name: 'Error',
        message: 'An error occurred message',
        stack: 'Error stack',
      },
      onConfirm: () => {
        // eslint-disable-next-line no-console
        console.log('Error dialog confirmed');
      },
      confirmLabel: 'Confirm Error',
    });
  };

  const createConfirmDialog = () => {
    openDialog({
      type: 'Prompt',
      title: 'Prompt Dialog',
      content: (
        <form id="prompt-example" onSubmit={(e) => e.preventDefault()}>
          <input
            required
            name="firstName"
            type="text"
            placeholder="please enter your first name..."
          />
        </form>
      ),
      confirmLabel: 'Yes',
      formId: 'prompt-example',
      onConfirm: () => {
        // get the form based on the formId
        const form = document.getElementById(
          'prompt-example',
        ) as HTMLFormElement;

        // check if the form is valid
        if (form.checkValidity()) {
          // if the form is valid, get the form data
          const formData = new FormData(form);
          const firstName = formData.get('firstName');
          // do something with the form data
          console.log('Prompt dialog confirmed with:', firstName);
          // then return true to close the dialog
          return !!firstName;
        }
        return false;
      },
    });
  };

  return (
    <div>
      <Button
        onClick={() => {
          createConfirmDialog();
          createErrorDialog();
        }}
      >
        Show Dialog
      </Button>
    </div>
  );
};

export default ShowDialog;
