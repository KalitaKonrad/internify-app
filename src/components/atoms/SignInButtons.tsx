import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import BusinessIcon from '@material-ui/icons/Business';
import FaceIcon from '@material-ui/icons/Face';
import { ButtonIcon } from '@components/atoms/ButtonIcon';
import { useDialog } from '../../hooks/useDialog';
import { SignInForm } from '@components/organisms/SignInForm';

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
}));

interface SignInButtonsProps {
  setDrawerOpen: (value: boolean) => void;
}

export const SignInButtons: React.FC<SignInButtonsProps> = ({ setDrawerOpen }) => {
  const classes = useStyles();
  const { setDialogChildren, setDialogOpen, setDialogTitle } = useDialog();

  const [isAuth, setIsAuth] = useState(false);

  return (
    <Box display="flex" flexDirection="column">
      <ButtonIcon
        onClick={() => {
          setDialogTitle('Sign up');
          setDialogChildren(<SignInForm />);
          setDialogOpen(true);
          setDrawerOpen(false);
        }}
        buttonText="Sign in as Developer"
      >
        <FaceIcon fontSize="large" />
      </ButtonIcon>
      <Box my={1} /> {/* divider */}
      <ButtonIcon onClick={() => console.log('business')} buttonText="Sign in as Company" type="secondary">
        <BusinessIcon fontSize="large" />
      </ButtonIcon>
    </Box>
  );
};
