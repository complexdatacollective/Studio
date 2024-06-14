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
  content,
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
          {content}
          <br />
          {error.name}
          {error.message}
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
