'use client';

import ConfirmDialog from './ConfirmDialog';
import ErrorDialog from './ErrorDialog';
import InfoDialog from './InfoDialog';
import WarningDialog from './WarningDialog';
import { type Dialog } from './dialog-schemas';
import useDialog from './useDialog';

const DialogComponents = {
  Info: InfoDialog,
  Confirm: ConfirmDialog,
  Warning: WarningDialog,
  Error: ErrorDialog,
};

const DialogManager = () => {
  const { dialogs } = useDialog();

  return <div>{dialogs.map(renderDialog)}</div>;
};

export default DialogManager;

const renderDialog = (dialog: Dialog) => {
  const DialogComponent = DialogComponents[dialog.type];
  return <DialogComponent key={dialog.id} {...dialog} />;
};
