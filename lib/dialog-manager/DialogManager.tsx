'use client';

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogOverlay,
} from '~/components/ui/Dialog';
import useDialog from './useDialog';
import { Button } from '~/components/ui/Button';

const DialogManager = () => {
  const { dialogs, confirmDialog, cancelDialog } = useDialog();

  return (
    <div>
      {dialogs.map((dialog) => (
        <Dialog
          key={dialog.id}
          open
          onOpenChange={() => cancelDialog(dialog.id)}
        >
          <DialogOverlay />
          <DialogContent variant={dialog.type}>
            {dialog.content}

            <DialogFooter>
              <Button variant="outline" onClick={() => cancelDialog(dialog.id)}>
                {dialog.cancelLabel ?? 'Cancel'}
              </Button>
              <Button onClick={() => confirmDialog(dialog.id)}>
                {dialog.confirmLabel ?? 'OK'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      ))}
    </div>
  );
};

export default DialogManager;
