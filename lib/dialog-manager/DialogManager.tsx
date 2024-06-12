'use client';

import { Dialog, DialogContent, DialogOverlay } from '~/components/ui/Dialog';
import useDialog from './useDialog';

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

          <DialogContent>
            {dialog.message}
            <button onClick={() => confirmDialog(dialog.id)}>Confirm</button>
            <button onClick={() => cancelDialog(dialog.id)}>Cancel</button>
          </DialogContent>
        </Dialog>
      ))}
    </div>
  );
};

export default DialogManager;
