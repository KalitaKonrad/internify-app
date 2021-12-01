import React from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  errorMessage: {
    color: theme.palette.error.main,
  },
  wrapper: {
    marginTop: theme.spacing(1),
  },
}));

interface ErrorMessageProps {
  message: string;
  className?: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, className }) => {
  const classes = useStyles();

  return (
    <div>
      <Typography variant="body2" className={clsx(classes.errorMessage, className)}>
        {message}
      </Typography>
    </div>
  );
};
