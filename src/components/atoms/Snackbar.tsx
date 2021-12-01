import React, { useState } from 'react';
import Snackbar, { SnackbarProps } from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

interface CustomSnackbarProps extends SnackbarProps {
  severity: AlertProps['severity'];
}

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export const CustomSnackbar: React.FC<CustomSnackbarProps> = ({ open, message, severity, ...rest }) => {
  const [isOpen, setOpen] = useState(open);

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      open={isOpen}
      autoHideDuration={3000}
      onClose={() => setOpen(false)}
      message={'hehe'}
      {...rest}
    >
      <Alert onClose={() => setOpen(false)} severity={severity}>
        {message}
      </Alert>
    </Snackbar>
  );
};
