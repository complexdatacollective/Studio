import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from '~/components/ui/Dialog';
import { Button } from '~/components/ui/Button';
import useDialog from './useDialog';
import { type InfoDialog as InfoDialogType } from './dialog-schemas';

const InfoDialog = ({
  id,
  confirmLabel,
  title,
  type,
  content,
}: InfoDialogType) => {
  const { confirmDialog } = useDialog();

  return (
    <Dialog key={id} open onOpenChange={() => confirmDialog(id)}>
      <DialogContent variant={type}>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{content}</DialogDescription>
        <DialogFooter>
          <Button onClick={() => confirmDialog(id)}>
            {confirmLabel ?? 'OK'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default InfoDialog;
