import React from 'react';
import { Paper } from '@material-ui/core';
import { JobWithCompanyAndOwner } from '../../../interfaces/Job';
import { MainJobInfo } from '@components/atoms/JobDetails/JobDetailsMainJobInfo';
import { DescriptionInfo } from '@components/atoms/JobDetails/JobDetailsDescriptionInfo';
import { makeStyles } from '@material-ui/core/styles';
import { BoxCenter } from '@components/atoms/BoxCenter';
import { Box } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { Link } from '@material-ui/core';

interface JobDetailsMainCardProps {
  job: JobWithCompanyAndOwner;
}

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    padding: 40,
    borderRadius: 10,
    width: '100%',
  },
}));

export const JobDetailsMainCard: React.FC<JobDetailsMainCardProps> = ({ job }) => {
  const classes = useStyles();

  return (
    <BoxCenter flexDirection="column">
      <Paper className={classes.paper}>
        <MainJobInfo job={job} />
        <DescriptionInfo job={job} />
      </Paper>
      <Box mt={6} />

      <Paper className={classes.paper}>
        <Box display="flex" flexDirection="column" width="100%">
          <Typography variant="h5">Details</Typography>
          <Typography variant="body1">{job.description}</Typography>
          <Box mt={2} />
          <Typography variant="h5">Apply at</Typography>
          <Link href={job.company.website_url} target="_blank">
            {job.company.website_url}
          </Link>
        </Box>
      </Paper>
    </BoxCenter>
  );
};
