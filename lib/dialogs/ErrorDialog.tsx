import { OctagonAlert } from 'lucide-react';
import { Button } from '~/components/ui/Button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from '~/components/ui/Dialog';
import { type ErrorDialog as ErrorDialogType } from './dialog-schemas';
import useDialog from './useDialog';

const ErrorDialog = ({ id, confirmLabel, error, title }: ErrorDialogType) => {
  const { confirmDialog } = useDialog();

  return (
    <Dialog key={id} open onOpenChange={() => confirmDialog(id)}>
      <DialogContent>
        <DialogTitle className="flex items-center gap-2">
          <OctagonAlert size={24} className="text-destructive" />
          {title}
        </DialogTitle>
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
