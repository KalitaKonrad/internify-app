import React from 'react';
import { Paper } from '@material-ui/core';
import { JobWithCompanyAndOwner } from '../../../interfaces/Job';
import { MainJobInfo } from '@components/atoms/JobDetails/JobDetailsMainJobInfo';
import { DescriptionInfo } from '@components/atoms/JobDetails/JobDetailsDescriptionInfo';
import { makeStyles } from '@material-ui/core/styles';
import { BoxCenter } from '@components/atoms/BoxCenter';

interface JobDetailsMainCardProps {
  job: JobWithCompanyAndOwner;
}

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    padding: 40,
    borderRadius: 10,
  },
}));

export const JobDetailsMainCard: React.FC<JobDetailsMainCardProps> = ({ job }) => {
  const classes = useStyles();

  return (
    <BoxCenter>
      <Paper className={classes.paper}>
        <MainJobInfo job={job} />
        <DescriptionInfo job={job} />
      </Paper>
    </BoxCenter>
  );
};
