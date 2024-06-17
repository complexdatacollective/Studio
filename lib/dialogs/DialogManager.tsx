'use client';

import ConfirmDialog from './ConfirmDialog';
import ErrorDialog from './ErrorDialog';
import InfoDialog from './InfoDialog';
import WarningDialog from './WarningDialog';
import { type Dialog } from './dialog-schemas';
import useDialog from './useDialog';
import { AnimatePresence } from 'framer-motion';

const DialogManager = () => {
  const { dialogs } = useDialog();
  return <AnimatePresence>{dialogs.map(renderDialog)}</AnimatePresence>;
};

export default DialogManager;

const renderDialog = (dialog: Dialog) => {
  switch (dialog.type) {
    case 'Info':
      return <InfoDialog key={dialog.id} {...dialog} />;
    case 'Confirm':
      return <ConfirmDialog key={dialog.id} {...dialog} />;
    case 'Warning':
      return <WarningDialog key={dialog.id} {...dialog} />;
    case 'Error':
      return <ErrorDialog key={dialog.id} {...dialog} />;
    default:
      throw new Error(`Unknown dialog type provided!}`);
  }
};