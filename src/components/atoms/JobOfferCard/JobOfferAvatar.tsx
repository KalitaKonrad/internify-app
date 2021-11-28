import React from 'react';
import { Avatar, useMediaQuery } from '@material-ui/core';
import { BoxCenter } from '@components/atoms/BoxCenter';
import { JobWithCompanyAndOwner } from '../../../interfaces/Job';
import { makeStyles } from '@material-ui/core/styles';
import { theme } from '../../../theme';
import { useMobile } from '../../../hooks/useMobile';

interface OfferAvatarProps {
  job: JobWithCompanyAndOwner;
}

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: 72,
    height: 72,
    [theme.breakpoints.down('sm')]: {
      width: 56,
      height: 56,
    },
  },
}));

export const JobOfferAvatar: React.FC<OfferAvatarProps> = ({ job }) => {
  const classes = useStyles();
  console.log();

  return (
    <BoxCenter mr={2}>
      {/* TODO: Add images to company and user models -> job.company.photo_url in src*/}
      <Avatar variant="square" src="/hehehe" className={classes.avatar} />
    </BoxCenter>
  );
};
