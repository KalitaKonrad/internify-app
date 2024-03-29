import React, { useEffect, useRef } from 'react';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuList from '@material-ui/core/MenuList';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import { makeStyles } from '@material-ui/core/styles';
import { useSession } from '../../hooks/useSession';
import { SignInButtons } from '@components/atoms/SignInButtons';

const useStyles = makeStyles((theme) => ({
  button: {
    borderRadius: 25,
    '&:hover': {
      color: theme.palette.primary.main,
      backgroundColor: theme.palette.background.paper,
    },
  },
}));

export const HeaderSignIn: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const classes = useStyles();
  const { isAuth } = useSession();

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return !isAuth ? (
    <>
      <Button
        ref={anchorRef}
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        color="inherit"
        variant="outlined"
        endIcon={open ? <ArrowDropUpIcon fontSize="large" /> : <ArrowDropDownIcon fontSize="large" />}
        className={classes.button}
      >
        Sign In
      </Button>
      <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
        {({ TransitionProps, placement }) => (
          <Grow {...TransitionProps} style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'left bottom' }}>
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                  <SignInButtons noBorder />
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  ) : null;
};
