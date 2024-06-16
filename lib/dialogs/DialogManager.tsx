'use client';

import ConfirmDialog from './ConfirmDialog';
import ErrorDialog from './ErrorDialog';
import InfoDialog from './InfoDialog';
import WarningDialog from './WarningDialog';
import { type Dialog } from './dialog-schemas';
import useDialog from './useDialog';

const DialogManager = () => {
  const { dialogs } = useDialog();
  return <div>{dialogs.map(renderDialog)}</div>;
};

export default DialogManager;

const renderDialog = (dialog: Dialog) => {
  switch (dialog.type) {
    case 'Info':
      return <InfoDialog {...dialog} />;
    case 'Confirm':
      return <ConfirmDialog {...dialog} />;
    case 'Warning':
      return <WarningDialog {...dialog} />;
    case 'Error':
      return <ErrorDialog {...dialog} />;
    default:
      throw new Error(`Unknown dialog type provided!}`);
  }
};
