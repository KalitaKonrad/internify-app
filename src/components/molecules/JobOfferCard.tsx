import React from 'react';
import { Paper } from '@material-ui/core';
import { BoxCenter } from '@components/atoms/BoxCenter';
import { JobWithCompanyAndOwner } from '../../interfaces/Job';
import { JobOfferAvatar } from '@components/atoms/JobOfferCard/JobOfferAvatar';
import { JobOfferCompanyInfo } from '@components/atoms/JobOfferCard/JobOfferCompanyInfo';
import { JobOfferGeneralInfo } from '@components/atoms/JobOfferCard/JobOfferGeneralInfo';

interface OfferCardProps {
  job: JobWithCompanyAndOwner;
}

export const JobOfferCard: React.FC<OfferCardProps> = ({ job }) => {
  return (
    <Paper elevation={2}>
      <BoxCenter mx={3} my={2}>
        <JobOfferAvatar job={job} />
        <JobOfferCompanyInfo job={job} />
        <JobOfferGeneralInfo job={job} />
      </BoxCenter>
    </Paper>
  );
};
