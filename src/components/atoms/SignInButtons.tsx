import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import BusinessIcon from '@material-ui/icons/Business';
import FaceIcon from '@material-ui/icons/Face';
import { ButtonIcon } from '@components/atoms/ButtonIcon';
import { useDialog } from '../../hooks/useDialog';
import { SignInForm } from '@components/organisms/SignInForm';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  employeeButtonWrapper: {
    backgroundColor: theme.palette.secondary.light,
    borderRadius: '50%',
  },
  employeeButtonIcon: {
    color: theme.palette.secondary.dark,
  },
  companyButtonWrapper: {
    backgroundColor: theme.palette.primary.light,
    borderRadius: '50%',
  },
  companyButtonIcon: {
    color: theme.palette.primary.dark,
  },
  noBorder: {
    border: 'none',
  },
}));

interface SignInButtonsProps {
  setDrawerOpen?: (value: boolean) => void;
  noBorder?: boolean;
}

export const SignInButtons: React.FC<SignInButtonsProps> = ({ setDrawerOpen, noBorder }) => {
  const classes = useStyles();
  const { setDialogChildren, setDialogOpen, setDialogTitle } = useDialog();

  return (
    <Box display="flex" flexDirection="column">
      <ButtonIcon
        onClick={() => {
          setDialogTitle('Sign in');
          setDialogChildren(<SignInForm />);
          setDialogOpen(true);
          setDrawerOpen?.(false);
        }}
        buttonText="Sign in as Developer"
        buttonClassName={clsx(noBorder && classes.noBorder)}
      >
        <FaceIcon fontSize="large" />
      </ButtonIcon>
      <Box my={1} /> {/* divider */}
      <ButtonIcon
        onClick={() => {
          setDialogTitle('Sign in');
          setDialogChildren(<SignInForm />);
          setDialogOpen(true);
          setDrawerOpen?.(false);
        }}
        buttonText="Sign in as Company"
        type="secondary"
        buttonClassName={clsx(noBorder && classes.noBorder)}
      >
        <BusinessIcon fontSize="large" />
      </ButtonIcon>
    </Box>
  );
};
