import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { BoxCenter } from '@components/atoms/BoxCenter';
import BusinessIcon from '@material-ui/icons/Business';
import RoomIcon from '@material-ui/icons/Room';
import { JobWithCompanyAndOwner } from '../../../interfaces/Job';
import { makeStyles } from '@material-ui/core/styles';

interface JobAndCompanyInfoProps {
  job: JobWithCompanyAndOwner;
}

const useStyles = makeStyles((theme) => ({
  companyInfo: {
    color: theme.palette.grey['700'],
  },
}));

export const JobOfferCompanyInfo: React.FC<JobAndCompanyInfoProps> = ({ job }) => {
  const classes = useStyles();
  return (
    <Box display="flex" flexDirection="column" justifyContent="space-between" mr={2}>
      {/*TODO: add ... if too long*/}
      <Typography variant="h6" color="textPrimary">
        {job.title}
      </Typography>

      <Box display="flex" alignItems="center">
        <BoxCenter mr={1}>
          <BoxCenter mr={1}>
            <BusinessIcon fontSize="small" />
          </BoxCenter>
          <Typography variant="body1" color="textPrimary" className={classes.companyInfo}>
            {job.company.name}
          </Typography>
        </BoxCenter>
        <BoxCenter>
          <BoxCenter mr={1}>
            <RoomIcon fontSize="small" className={classes.companyInfo} />
          </BoxCenter>
          <Typography variant="body1" color="textPrimary" className={classes.companyInfo}>
            Warszawa
            {/*TODO: add headquartes to model*/}
            {/*{job.company.headquarters}*/}
          </Typography>
          {/*  TODO: add isRemote? */}
        </BoxCenter>
      </Box>
    </Box>
  );
};
