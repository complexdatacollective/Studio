'use client';

import { Dialog, DialogContent, DialogFooter } from '~/components/ui/Dialog';
import useDialog from './useDialog';
import { Button } from '~/components/ui/Button';
import { DialogDescription, DialogTitle } from '@radix-ui/react-dialog';

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
          <DialogContent variant={dialog.type}>
            <DialogTitle>{dialog.title}</DialogTitle>
            <DialogDescription>{dialog.content}</DialogDescription>
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
