import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import BusinessIcon from '@material-ui/icons/Business';
import FaceIcon from '@material-ui/icons/Face';
import { ButtonIcon } from '@components/atoms/ButtonIcon';

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

export const SignInButtons: React.FC = () => {
  const classes = useStyles();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isAuth, setIsAuth] = useState(false);

  return (
    <Box display="flex" flexDirection="column">
      <ButtonIcon onClick={() => console.log('employee')} buttonText="Sign in as Developer">
        <FaceIcon fontSize="large" />
      </ButtonIcon>
      <Box my={1} /> {/* divider */}
      <ButtonIcon onClick={() => console.log('business')} buttonText="Sign in as Company" type="secondary">
        <BusinessIcon fontSize="large" />
      </ButtonIcon>
    </Box>
  );
};
