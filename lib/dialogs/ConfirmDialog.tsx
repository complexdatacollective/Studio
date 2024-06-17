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
import { BookmarkCheck } from 'lucide-react';

const ConfirmDialog = ({
  id,
  confirmLabel,
  title,
  content,
  cancelLabel,
  order,
}: ConfirmDialogType & { order: number }) => {
  const { confirmDialog, cancelDialog } = useDialog();

  return (
    <Dialog key={id} open onOpenChange={() => cancelDialog(id)}>
      <DialogContent dialogOrder={order}>
        <DialogTitle className="flex items-center gap-2">
          <BookmarkCheck size={24} className="text-cyber-grape" />
          {title}
        </DialogTitle>
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
