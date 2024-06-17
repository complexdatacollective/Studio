import { Info } from 'lucide-react';
import { Button } from '~/components/ui/Button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from '~/components/ui/Dialog';
import { type InfoDialog as InfoDialogType } from './dialog-schemas';
import useDialog from './useDialog';

const InfoDialog = ({
  id,
  confirmLabel,
  title,
  content,
  order,
}: InfoDialogType & { order: number }) => {
  const { confirmDialog } = useDialog();

  return (
    <Dialog key={id} open onOpenChange={() => confirmDialog(id)}>
      <DialogContent dialogOrder={order}>
        <DialogTitle className="flex items-center gap-2">
          <Info size={24} className="text-cerulean-blue" />
          {title}
        </DialogTitle>
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
