/* eslint-disable no-console */
'use client';

import { Button } from '~/components/ui/Button';
import useDialog from '~/lib/dialogs/useDialog';

const ShowDialog = () => {
  const { showDialog } = useDialog();

  const createErrorDialog = () => {
    showDialog({
      type: 'Error',
      title: 'Error Dialog',
      error: {
        name: 'Error',
        message:
          'An error occurred,Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam earum est ea eius fuga optio numquam officiis id voluptas debitis, laudantium, possimus sint cumque vitae perferendis similique explicabo eligendi minima!',
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
    showDialog({
      type: 'Prompt',
      title: 'Prompt Dialog',
      content: (
        <form id="prompt-example">
          <input required type="text" placeholder="please enter your name..." />
        </form>
      ),
      confirmLabel: 'Yes',
      formId: 'prompt-example',
      onConfirm: () => {
        // submit the form and prevent default refresh
        const form = document.getElementById('prompt-example');
        if (form instanceof HTMLFormElement) {
          form.submit();
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
