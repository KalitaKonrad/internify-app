import React from 'react';
import { Avatar, Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import NextLink from 'next/link';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { DrawerLineItem } from '@components/atoms/headerDrawer/DrawerLineItem';
import { BoxCenter } from '@components/atoms/BoxCenter';

interface DrawerProfileInfoProps {
  username: string;
  email: string;
  photo?: string;
}

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: 56,
    height: 56,
  },
  menuButton: {
    width: '100%',
    borderRadius: 0,
    borderLeft: 'none',
    borderRight: 'none',
    borderColor: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: 'rgba(49, 131, 200, 0.04)',
    },
  },
}));

export const DrawerProfileInfo: React.FC<DrawerProfileInfoProps> = ({ username, photo }) => {
  const classes = useStyles();

  return (
    <BoxCenter flexGrow={1} flexDirection="column">
      <DrawerLineItem>
        <BoxCenter mb={1}>
          <Avatar className={classes.avatar} variant="circle" src={photo} alt={username} />
        </BoxCenter>
        <BoxCenter mb={1}>
          <Typography variant="body2" color="textSecondary">
            Welcome
          </Typography>
        </BoxCenter>
        <BoxCenter mb={1}>
          <Typography variant="body1" color="textPrimary">
            {username}
          </Typography>
        </BoxCenter>
      </DrawerLineItem>
      <NextLink href="/account/profile" passHref>
        <Button variant="outlined" className={classes.menuButton} size="large">
          <BoxCenter mr={1}>
            <AccountCircle color="primary" />
          </BoxCenter>
          <Typography variant="body1" color="primary">
            Profile
          </Typography>
        </Button>
      </NextLink>
    </BoxCenter>
  );
};
