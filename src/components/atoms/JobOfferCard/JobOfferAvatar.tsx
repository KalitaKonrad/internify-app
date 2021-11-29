import React from 'react';
import { Avatar } from '@material-ui/core';
import { BoxCenter } from '@components/atoms/BoxCenter';
import { JobWithCompanyAndOwner } from '../../../interfaces/Job';
import { makeStyles } from '@material-ui/core/styles';

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

  return (
    <BoxCenter mr={2}>
      {/* TODO: Add images to company and user models -> job.company.photo_url in src*/}
      <Avatar variant="square" src="/hehehe" className={classes.avatar} />
    </BoxCenter>
  );
};
