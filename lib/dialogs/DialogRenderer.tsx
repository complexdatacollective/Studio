'use client';

import * as DialogPrimitive from '@radix-ui/react-dialog';
import { useDialogs } from './useDialogs';
import { DialogContent } from '~/components/ui/Dialog';
import ModalOverlay from '~/components/ui/form/ModalOverlay';

export const DialogTrigger = DialogPrimitive.Trigger;

export function DialogRenderer() {
  const { showOverlay, closeDialog, activeDialog } = useDialogs();
  return (
    <ModalOverlay open={showOverlay} onOpenChange={closeDialog}>
      {activeDialog && (
        <DialogContent
          key={activeDialog.id}
          title={activeDialog.title}
          description={activeDialog.description}
        >
          {activeDialog.content}
        </DialogContent>
      )}
    </ModalOverlay>
  );
}
