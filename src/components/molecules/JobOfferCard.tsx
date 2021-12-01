import React from 'react';
import { Paper } from '@material-ui/core';
import { BoxCenter } from '@components/atoms/BoxCenter';
import { JobWithCompanyAndOwner } from '../../interfaces/Job';
import { JobOfferAvatar } from '@components/atoms/JobOfferCard/JobOfferAvatar';
import { JobOfferCompanyInfo } from '@components/atoms/JobOfferCard/JobOfferCompanyInfo';
import { JobOfferGeneralInfo } from '@components/atoms/JobOfferCard/JobOfferGeneralInfo';
import { makeStyles } from '@material-ui/core/styles';
import { LinkWrapper } from '@components/atoms/LinkWrapper';

interface OfferCardProps {
  job: JobWithCompanyAndOwner;
}

const useStyles = makeStyles(() => ({
  paper: {
    maxWidth: 1000,
    width: '100%',
  },
  offerCard: {
    transition: 'all 0.3s',
    '&:hover': {
      paddingTop: '0.5rem',
      paddingBottom: '0.5rem',
    },
  },
}));

export const JobOfferCard: React.FC<OfferCardProps> = ({ job }) => {
  const classes = useStyles();

  return (
    <LinkWrapper href={`/jobs/${job.slug}`} className={classes.offerCard}>
      <BoxCenter minWidth={850}>
        <Paper elevation={2} className={classes.paper}>
          <BoxCenter mx={4} my={3}>
            <JobOfferAvatar job={job} />
            <JobOfferCompanyInfo job={job} />
            <JobOfferGeneralInfo job={job} />
          </BoxCenter>
        </Paper>
      </BoxCenter>
    </LinkWrapper>
  );
};
