'use client';

import { Button } from '~/components/ui/Button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/Dialog';
import useDialog from './useDialog';

function DialogManager() {
  const { dialogs, confirmDialog } = useDialog();
  const dialog = dialogs[0];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Open dialog</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{dialog.title}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">{dialog.message}</div>
        <DialogFooter>
          <Button onClick={() => confirmDialog(dialog.id)}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default DialogManager;
