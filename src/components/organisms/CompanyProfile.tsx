import React, { useCallback } from 'react';
import useSWR from 'swr';
import { useAxios } from '../../hooks/useAxios';
import { CompanyInfo } from '@components/molecules/CompanyInfo';
import { BoxCenter } from '@components/atoms/BoxCenter';
import { Box, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { CompanyOffers } from '@components/organisms/CompanyOffers';
import { CompanyWithOwner } from '../../interfaces/Job';

interface CompanyProfileProps {
  company: CompanyWithOwner;
  isEditing?: boolean;
}

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    position: 'relative',
    flexDirection: 'column',
    padding: 40,
    borderRadius: 10,
    width: '100%',
  },
}));

export const CompanyProfile: React.FC<CompanyProfileProps> = ({ company, isEditing }) => {
  const classes = useStyles();

  return (
    <BoxCenter flexDirection="column" p={3}>
      <Paper className={classes.paper}>
        {/*TODO: swap for actual company data when two types of users are available*/}
        <CompanyInfo company={company} isEditing={isEditing} />
      </Paper>
      <Box mt={4} />
      <Paper className={classes.paper}>
        {/*TODO: swap for actual company data when two types of users are available*/}
        <CompanyOffers company={company} isEditing={isEditing} />
      </Paper>
    </BoxCenter>
  );
};
