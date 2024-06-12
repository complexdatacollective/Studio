'use client';

import { Button } from '~/components/ui/Button';
import useDialog from '~/lib/dialog-manager/useDialog';

const CreateDialog = () => {
  const { showDialog } = useDialog();

  const createDialog = () => {
    showDialog({
      id: '1234-1234-1',
      type: 'Confirm',
      title: 'Something to confirm',
      message: 'More detail about confirmation',
      confirmLabel: 'Yes please!',
      onConfirm: () => {
        // eslint-disable-next-line no-console
        console.log('dialog confirmed');
      },
      onCancel: () => {
        // eslint-disable-next-line no-console
        console.log('dialog cancelled');
      },
    });
  };

  return <Button onClick={createDialog}>create dialog</Button>;
};

export default CreateDialog;
