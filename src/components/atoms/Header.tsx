import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Button, Drawer } from '@material-ui/core';

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
}));

export const Header: React.FC = () => {
  const classes = useStyles();

  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <AppBar position="static" color="primary" elevation={0} className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <Box className={classes.toolbarLeftSide}>
          <Typography variant="h6" color="inherit" noWrap>
            Internify
          </Typography>
          <Typography variant="h6" color="inherit" noWrap>
            Internify 2
          </Typography>
        </Box>
        <Button color="inherit" variant="contained" onClick={() => setDrawerOpen(true)}>
          open
        </Button>
      </Toolbar>
      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        hehe
      </Drawer>
    </AppBar>
  );
};
