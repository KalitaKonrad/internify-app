import { CompanyWithOwner } from '../../../interfaces/Job';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { BoxCenter } from '@components/atoms/BoxCenter';
import { Paper } from '@material-ui/core';
import { MainJobInfo } from '@components/atoms/JobDetails/JobDetailsMainJobInfo';
import { DescriptionInfo } from '@components/atoms/JobDetails/JobDetailsDescriptionInfo';

interface CompanyDetailsMainCardProps {
  company: CompanyWithOwner;
}

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    padding: 40,
    borderRadius: 10,
  },
}));

export const CompanyDetailsMainCard: React.FC<CompanyDetailsMainCardProps> = ({ company }) => {
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
