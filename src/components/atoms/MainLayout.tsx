import React from 'react';
import { Header } from '@components/organisms/Header';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  main: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
}));

export const MainLayout: React.FC = ({ children }) => {
  const classes = useStyles();

  return (
    <div className={classes.main}>
      <Header />
      {children}
    </div>
  );
};
