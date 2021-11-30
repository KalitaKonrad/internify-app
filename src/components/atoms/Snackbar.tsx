import React, { useState } from 'react';
import Snackbar, { SnackbarProps } from '@material-ui/core/Snackbar';

export const CustomSnackbar: React.FC<SnackbarProps> = ({ open, message }) => {
  const [isOpen, setOpen] = useState(open);

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      open={isOpen}
      autoHideDuration={6000}
      message={message}
      onClose={() => setOpen(false)}
    />
  );
};
