import React, { useState } from 'react';
import { Header } from '@components/organisms/Header';
import { makeStyles } from '@material-ui/core/styles';
import { PostJobForm } from '@components/organisms/PostJobForm';
import { CustomSnackbar } from '@components/atoms/Snackbar';
import { useAxios } from '../../hooks/useAxios';
import { useDialog } from '../../hooks/useDialog';
import { useSWRConfig } from 'swr';

const useStyles = makeStyles(() => ({
  main: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
}));

export const MainLayout: React.FC = ({ children }) => {
  const classes = useStyles();
  const [success, setSuccess] = React.useState(false);
  const { setDialogChildren, setDialogTitle, setDialogOpen } = useDialog();

  const { mutate } = useSWRConfig();

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
      await axios.post('jobs/', d);
      setError(undefined);
      setSuccess(true);
      setDialogOpen(false);
      mutate('jobs/?page=1');
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
      {(!!error || !!success) && (
        <CustomSnackbar open={!!error || !!success} message={error?.message} severity={success ? 'success' : 'error'} />
      )}
    </>
  );
};
