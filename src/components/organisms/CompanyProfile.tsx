import React from 'react';
import { CompanyInfo } from '@components/molecules/CompanyInfo';
import { BoxCenter } from '@components/atoms/BoxCenter';
import { Box, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { CompanyOffers } from '@components/organisms/CompanyOffers';
import { CompanyWithOwner } from '../../interfaces/Job';

interface CompanyProfileProps {
  isEditing?: boolean;
  company: CompanyWithOwner;
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

export const CompanyProfile: React.FC<CompanyProfileProps> = ({ isEditing, company }) => {
  const classes = useStyles();

  return (
    <BoxCenter flexDirection="column" p={3} maxWidth={1200}>
      <Paper className={classes.paper}>
        <CompanyInfo company={company} isEditing={isEditing} />
      </Paper>
      <Box mt={4} />
      <Paper className={classes.paper}>
        <CompanyOffers company={company} isEditing={isEditing} />
      </Paper>
    </BoxCenter>
  );
};
