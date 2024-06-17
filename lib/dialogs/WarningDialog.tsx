import { TriangleAlert } from 'lucide-react';
import { Button } from '~/components/ui/Button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from '~/components/ui/Dialog';
import { type WarningDialog as WarningDialogType } from './dialog-schemas';
import useDialog from './useDialog';

const WarningDialog = ({
  id,
  confirmLabel,
  title,
  content,
  cancelLabel,
  order,
}: WarningDialogType & { order: number }) => {
  const { confirmDialog, cancelDialog } = useDialog();

  return (
    <Dialog key={id} open onOpenChange={() => cancelDialog(id)}>
      <DialogContent dialogOrder={order}>
        <DialogTitle className="flex items-center gap-2">
          <TriangleAlert className="h-6 w-6 text-mustard" />
          {title}
        </DialogTitle>
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
