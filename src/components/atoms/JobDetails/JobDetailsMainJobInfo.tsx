import { JobWithCompanyAndOwner } from '../../../interfaces/Job';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { BoxCenter } from '@components/atoms/BoxCenter';
import { Avatar, Box, Typography } from '@material-ui/core';
import RoomIcon from '@material-ui/icons/Room';
import { formatSalary } from '../../../utils/formatSalary';

interface MainJobInfoProps {
  job: JobWithCompanyAndOwner;
}

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: 105,
    height: 105,
    [theme.breakpoints.down('sm')]: {
      width: 95,
      height: 95,
    },
  },
  salary: {
    fontWeight: 500,
    color: theme.palette.success.main,
  },
}));

export const MainJobInfo: React.FC<MainJobInfoProps> = ({ job }) => {
  const classes = useStyles();
  const salaryText = formatSalary(job.salary_min, job.salary_max);

  return (
    <BoxCenter p={2} flexDirection="column">
      <Box display="flex" justifyContent="center">
        <BoxCenter mr={2}>
          {/*TODO: job.company.photo*/}
          <Avatar className={classes.avatar} variant="circle" src={'photo'} />
        </BoxCenter>

        <Box display="flex" flexDirection="column">
          <Box display="flex">
            <Typography variant="h5">{job.title}</Typography>
          </Box>
          <Box display="flex" my={1}>
            <BoxCenter>
              <RoomIcon color="action" />
            </BoxCenter>
            <BoxCenter>
              <Typography variant="body1">{job.company.headquarters}</Typography>
            </BoxCenter>
          </Box>
          <Box display="flex">
            <Typography variant="body1" className={classes.salary}>
              {salaryText}
            </Typography>
          </Box>
        </Box>
      </Box>
    </BoxCenter>
  );
};
