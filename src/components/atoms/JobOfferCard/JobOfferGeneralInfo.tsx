import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { BoxCenter } from '@components/atoms/BoxCenter';
import { formatDistanceStrict, isToday } from 'date-fns';
import { makeStyles } from '@material-ui/core/styles';
import { JobWithCompanyAndOwner } from '../../../interfaces/Job';
import { formatSalary } from '../../../utils/formatSalary';

interface GeneralJobInfoProps {
  job: JobWithCompanyAndOwner;
}

// returns date in format like: 5h ago, 1d ago,
export const formatPublishDate = (date: Date | string) => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;

  if (isToday(dateObj)) {
    return 'New';
  }

  // returns date like 23 hours ago / 2 days ago / 1 month ago
  const formatted = formatDistanceStrict(dateObj, new Date(), {
    addSuffix: true,
  });
  const [amount, unit, ago] = formatted.split(' ');

  // unit[0] indicates first letter from day/hour/month/year
  return `${amount}${unit[0]} ${ago}`;
};

const useStyles = makeStyles((theme) => ({
  salary: {
    fontWeight: 500,
    color: theme.palette.success.main,
  },
  jobOfferPublishedNow: {
    backgroundColor: theme.palette.secondary.main,
    borderRadius: 25,
    color: theme.palette.background.paper,
  },
  jobOfferPublishedAgo: {
    backgroundColor: theme.palette.primary.main,
    borderRadius: 25,
    color: theme.palette.background.paper,
  },
}));

export const JobOfferGeneralInfo: React.FC<GeneralJobInfoProps> = ({ job }) => {
  const classes = useStyles();
  const jobOfferPublishedText = formatPublishDate(new Date(job.published));
  const salaryText = formatSalary(job.salary_min, job.salary_max);

  return (
    <Box display="flex" flexDirection="column" justifyContent="space-between" flexGrow={1}>
      {/*TODO: add ... if too long*/}
      <Box display="flex" justifyContent="flex-end">
        <BoxCenter mr={3}>
          <Typography variant="body1" className={classes.salary}>
            {salaryText}
          </Typography>
        </BoxCenter>
        <BoxCenter
          width={100}
          className={isToday(new Date(job.published)) ? classes.jobOfferPublishedNow : classes.jobOfferPublishedAgo}
        >
          {jobOfferPublishedText}
        </BoxCenter>
      </Box>
      <Box display="flex" alignItems="center" justifyContent="flex-end" mt={2}>
        <BoxCenter>
          <Typography variant="body1" color="textPrimary">
            {job.experience} YOE
          </Typography>
        </BoxCenter>
      </Box>
    </Box>
  );
};
