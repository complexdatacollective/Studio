import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from '~/components/ui/Dialog';
import { Button } from '~/components/ui/Button';
import useDialog from './useDialog';
import { type WarningDialog as WarningDialogType } from './dialog-schemas';

const WarningDialog = ({
  id,
  confirmLabel,
  title,
  type,
  content,
  cancelLabel,
}: WarningDialogType) => {
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
            {confirmLabel ?? 'Yes'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default WarningDialog;
