import { Button } from '~/components/ui/Button';
import useDialog from '~/lib/dialogs/useDialog';

const ShowDialog = () => {
  const { showDialog } = useDialog();

  const createDialog = () => {
    showDialog({
      type: 'Info',
      title: 'Dialog title',
      content: 'This is the dialog content.',
      confirmLabel: 'OK',
      cancelLabel: 'Cancel',
      onConfirm: () => undefined,
      onCancel: () => undefined,
    });
  };

  return (
    <div>
      <Button onClick={() => createDialog()}>Show Dialog</Button>
    </div>
  );
};

export default ShowDialog;
