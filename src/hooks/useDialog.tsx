import React, { ReactNode, useContext, useState } from 'react';

export type DialogResult = {
  dialogTitle: string;
  setDialogTitle: (value: string) => void;
  dialogChildren: ReactNode;
  setDialogChildren: (node: ReactNode) => void;
  dialogOpen: boolean;
  setDialogOpen: (value: boolean) => void;
};

const DialogContext = React.createContext<DialogResult>({
  dialogTitle: '',
  setDialogTitle: () => null,
  dialogChildren: null,
  setDialogChildren: () => null,
  dialogOpen: false,
  setDialogOpen: () => null,
});

export const DialogProvider: React.FC = ({ children }) => {
  const [dialogTitle, setDialogTitle] = useState('');
  const [dialogChildren, setDialogChildren] = useState<ReactNode | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <DialogContext.Provider
      value={{ dialogTitle, setDialogTitle, dialogChildren, setDialogChildren, dialogOpen, setDialogOpen }}
    >
      {children}
    </DialogContext.Provider>
  );
};
export const useDialog = (): DialogResult => useContext(DialogContext);
