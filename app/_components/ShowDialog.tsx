'use client';

import { Button } from '~/components/ui/Button';
import useDialog from '~/lib/dialogs/useDialog';

const ShowDialog = () => {
  const { showDialog } = useDialog();

  const createDialog = () => {
    showDialog({
      type: 'Error',
      title: 'Error Dialog',
      error: {
        name: 'Error',
        message: 'An error occurred',
        stack: 'Error stack',
      },
      onConfirm: () => {
        // eslint-disable-next-line no-console
        console.log('Error dialog confirmed');
      },
      confirmLabel: 'Confirm Error',
    });
  };

  return (
    <div>
      <Button onClick={() => createDialog()}>Show Dialog</Button>
    </div>
  );
};

export default ShowDialog;
