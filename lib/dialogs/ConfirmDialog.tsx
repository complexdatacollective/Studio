import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from '~/components/ui/Dialog';
import { Button } from '~/components/ui/Button';
import useDialog from './useDialog';
import { type ConfirmDialog as ConfirmDialogType } from './dialog-schemas';

const ConfirmDialog = ({
  id,
  confirmLabel,
  title,
  type,
  content,
  cancelLabel,
}: ConfirmDialogType) => {
  const { confirmDialog, cancelDialog } = useDialog();

  return (
    <Dialog key={id} open onOpenChange={() => cancelDialog(id)}>
      <DialogContent variant={type}>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{content}</DialogDescription>
        <DialogFooter>
          <Button variant="outline" onClick={() => cancelDialog(id)}>
            {cancelLabel ?? 'Cancel'}
          </Button>
          <Button onClick={() => confirmDialog(id)}>
            {confirmLabel ?? 'Confirm'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmDialog;
