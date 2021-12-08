import React, { useState } from 'react';
import { Box, Button, Drawer, IconButton } from '@material-ui/core';
import { DrawerLineItem } from '@components/atoms/HeaderDrawer/DrawerLineItem';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import { SignInButtons } from '@components/atoms/SignInButtons';
import { DrawerProfileInfo } from '@components/atoms/HeaderDrawer/DrawerProfileInfo';
import { makeStyles } from '@material-ui/core/styles';
import { UserType, useSession } from '../../hooks/useSession';

interface HeaderDrawerProps {
  drawerOpen: boolean;
  setDrawerOpen: (value: boolean) => void;
}

const useStyles = makeStyles((theme) => ({
  closeIcon: {
    borderRadius: '50%',
    border: `1px solid ${theme.palette.divider}`,
  },
  paper: {
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 400,
    },
  },
  menuItemsContainer: {
    height: '100%',
  },
  logoutButton: {
    width: '100%',
  },
}));

export const HeaderDrawer: React.FC<HeaderDrawerProps> = ({ drawerOpen, setDrawerOpen }) => {
  const classes = useStyles();
  const { isAuth, userCompany, userEmployee, userType, logout } = useSession();

  const username = userType === UserType.IS_COMPANY ? userCompany?.owner?.username : userEmployee?.user?.username;
  const email = userType === UserType.IS_COMPANY ? userCompany?.owner?.email : userEmployee?.user?.email;

  return (
    <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)} classes={{ paper: classes.paper }}>
      <Box
        display="flex"
        flexDirection="column"
        my={3}
        justifyContent="space-between"
        className={classes.menuItemsContainer}
      >
        <div>
          <DrawerLineItem>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="h5">Menu</Typography>
              <IconButton onClick={() => setDrawerOpen(false)} color="inherit" className={classes.closeIcon}>
                <CloseIcon />
              </IconButton>
            </Box>
          </DrawerLineItem>

          {isAuth && (
            <DrawerProfileInfo username={username} email={email} photo={'hehe'} setDrawerOpen={setDrawerOpen} />
          )}
          {!isAuth && (
            <DrawerLineItem>
              <SignInButtons setDrawerOpen={setDrawerOpen} />
            </DrawerLineItem>
          )}
        </div>

        {isAuth && (
          <DrawerLineItem>
            <Button color="primary" variant="contained" onClick={logout} className={classes.logoutButton}>
              Logout
            </Button>
          </DrawerLineItem>
        )}
      </Box>
    </Drawer>
  );
};
