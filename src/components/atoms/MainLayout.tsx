import React, { useState } from 'react';
import { Header } from '@components/organisms/Header';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { PostJobForm } from '@components/organisms/PostJobForm';
import { CustomSnackbar } from '@components/atoms/Snackbar';
import { useAxios } from '../../hooks/useAxios';
import { useDialog } from '../../hooks/useDialog';

const useStyles = makeStyles(() => ({
  main: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  // @ts-ignore
  return <Slide direction="down" ref={ref} {...props} />;
});

export const MainLayout: React.FC = ({ children }) => {
  const classes = useStyles();
  const [success, setSuccess] = React.useState(false);
  const { dialogChildren, setDialogChildren, setDialogTitle, setDialogOpen, dialogOpen, dialogTitle } = useDialog();

  const onPostJobClick = () => {
    setDialogTitle('Post job offer');
    setDialogChildren(<PostJobForm onSubmit={onSubmit} handleClose={handleClose} />);
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  const axios = useAxios();
  const [error, setError] = useState<Error>();

  const onSubmit = async (d) => {
    try {
      const res = await axios.post('jobs/', d);
      setError(undefined);
      setSuccess(true);
      console.log({ res });
    } catch (e) {
      console.error(e);
      setError(e);
    }
  };

  return (
    <>
      <div className={classes.main}>
        <Header onPostJobClick={onPostJobClick} />
        {children}
      </div>
      {/*@ts-ignore*/}
      <Dialog open={dialogOpen} TransitionComponent={Transition} onClose={handleClose}>
        <DialogTitle id="alert-dialog-post-edit-job">{dialogTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">{dialogChildren}</DialogContentText>
        </DialogContent>
      </Dialog>
      {(!!error || !!success) && (
        <CustomSnackbar open={!!error || !!success} message={error?.message} severity={success ? 'success' : 'error'} />
      )}
    </>
  );
};
