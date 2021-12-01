import React, { ReactNode, useContext, useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Slide from '@material-ui/core/Slide';

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

const Transition = React.forwardRef(function Transition(props, ref) {
  // @ts-ignore
  return <Slide direction="down" ref={ref} {...props} />;
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
      {/*@ts-ignore*/}
      <Dialog open={dialogOpen} TransitionComponent={Transition} onClose={() => setDialogOpen(false)}>
        <DialogTitle id="alert-dialog-post-edit-job">{dialogTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">{dialogChildren}</DialogContentText>
        </DialogContent>
      </Dialog>
    </DialogContext.Provider>
  );
};
export const useDialog = (): DialogResult => useContext(DialogContext);
