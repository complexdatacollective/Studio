import { TriangleAlert } from 'lucide-react';
import { Button } from '~/components/ui/Button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from '~/components/ui/Dialog';
import { type PromptDialog as PromptDialogType } from './dialog-schemas';
import useDialog from './useDialog';

const PromptDialog = ({
  id,
  confirmLabel,
  title,
  content,
  order,
  formId,
}: PromptDialogType & { order: number }) => {
  const { confirmDialog } = useDialog();

  return (
    <Dialog key={id} modal open onOpenChange={() => confirmDialog(id)}>
      <DialogContent disableClose dialogOrder={order}>
        <DialogTitle className="flex items-center gap-2">
          <TriangleAlert className="h-6 w-6 text-mustard" />
          {title}
        </DialogTitle>
        <DialogDescription>{content}</DialogDescription>
        <DialogFooter>
          <Button form={formId} type="submit" onClick={() => confirmDialog(id)}>
            {confirmLabel ?? 'Submit'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PromptDialog;
