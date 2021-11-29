import React from 'react';
import { Paper } from '@material-ui/core';
import { BoxCenter } from '@components/atoms/BoxCenter';
import { JobWithCompanyAndOwner } from '../../interfaces/Job';
import { JobOfferAvatar } from '@components/atoms/JobOfferCard/JobOfferAvatar';
import { JobOfferCompanyInfo } from '@components/atoms/JobOfferCard/JobOfferCompanyInfo';
import { JobOfferGeneralInfo } from '@components/atoms/JobOfferCard/JobOfferGeneralInfo';
import { makeStyles } from '@material-ui/core/styles';
import NextLink from 'next/link';
import { LinkWrapper } from '@components/atoms/LinkWrapper';

interface OfferCardProps {
  job: JobWithCompanyAndOwner;
}

const useStyles = makeStyles((theme) => ({
  paper: {
    maxWidth: 1000,
  },
}));

export const JobOfferCard: React.FC<OfferCardProps> = ({ job }) => {
  const classes = useStyles();

  return (
    <LinkWrapper href={`/jobs/${job.slug}`}>
      <BoxCenter>
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
