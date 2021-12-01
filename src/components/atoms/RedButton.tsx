import React from 'react';
import { Button, ButtonProps } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  error: {
    border: `1px solid ${theme.palette.error.main}`,
    color: theme.palette.error.main,
  },
}));

export const DangerButton: React.FC<ButtonProps> = ({ className, ...restProps }) => {
  const classes = useStyles();
  return <Button {...restProps} className={clsx(classes.error, className)} />;
};
