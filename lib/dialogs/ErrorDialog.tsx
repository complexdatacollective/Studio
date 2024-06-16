import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from '~/components/ui/Dialog';
import { Button } from '~/components/ui/Button';
import useDialog from './useDialog';
import { type ErrorDialog as ErrorDialogType } from './dialog-schemas';

const ErrorDialog = ({
  id,
  type,
  confirmLabel,
  error,
  title,
}: ErrorDialogType) => {
  const { confirmDialog } = useDialog();

  return (
    <Dialog key={id} open onOpenChange={() => confirmDialog(id)}>
      <DialogContent variant={type}>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>
          {error.name}
          <br />
          {error.message}
          <br />
          {error.stack}
        </DialogDescription>
        <DialogFooter>
          <Button onClick={() => confirmDialog(id)}>
            {confirmLabel ?? 'OK'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ErrorDialog;
