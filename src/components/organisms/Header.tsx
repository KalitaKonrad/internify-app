import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Box, IconButton } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu';
import { HeaderDrawer } from '@components/molecules/HeaderDrawer';
import { HeaderSignIn } from '@components/molecules/HeaderSignIn';
import { BoxCenter } from '@components/atoms/BoxCenter';
import { LinkButton } from '@components/atoms/headerDrawer/LinkButton';
import NextLink from 'next/link';

const useStyles = makeStyles((theme) => ({
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  toolbarLeftSide: {
    display: 'flex',
  },
  logo: {
    cursor: 'pointer',
  },
}));

export const Header: React.FC = () => {
  const classes = useStyles();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isAuth, setIsAuth] = useState(false);

  return (
    <AppBar position="sticky" color="primary" elevation={0} className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <Box className={classes.toolbarLeftSide}>
          <NextLink href="/" passHref>
            <Typography variant="h6" color="inherit" noWrap className={classes.logo}>
              Internify
            </Typography>
          </NextLink>
        </Box>
        <BoxCenter>
          <Box mr={2}>
            <HeaderSignIn />
          </Box>
          <Box mr={2}>
            <LinkButton onClick={() => console.log('post a job')} color="inherit" variant="outlined">
              Post a Job
            </LinkButton>
          </Box>
          <IconButton
            aria-label={isAuth ? 'account of current user' : 'menu settings'}
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={() => setDrawerOpen(true)}
            color="inherit"
          >
            {isAuth ? <AccountCircle /> : <MenuIcon />}
          </IconButton>
        </BoxCenter>
        <HeaderDrawer drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />
      </Toolbar>
    </AppBar>
  );
};
