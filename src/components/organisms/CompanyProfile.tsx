import React from 'react';
import { CompanyInfo } from '@components/molecules/CompanyInfo';
import { BoxCenter } from '@components/atoms/BoxCenter';
import { Box, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { CompanyOffers } from '@components/organisms/CompanyOffers';
import { useSession } from '../../hooks/useSession';
import useSWR from 'swr';
import { useAxios } from '../../hooks/useAxios';

interface CompanyProfileProps {
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

export const CompanyProfile: React.FC<CompanyProfileProps> = ({ isEditing }) => {
  const classes = useStyles();
  const axios = useAxios();
  const { userCompany } = useSession();
  const fetcher = (url) => axios.get(url).then((res) => res.data);

  const { data: { data = {} } = {}, error } = useSWR(`companies/${userCompany.slug}/`, fetcher, {
    refreshInterval: 5000,
  });

  console.log(data);
  return (
    <BoxCenter flexDirection="column" p={3}>
      <Paper className={classes.paper}>
        <CompanyInfo company={data} isEditing={isEditing} />
      </Paper>
      <Box mt={4} />
      <Paper className={classes.paper}>
        <CompanyOffers company={data} isEditing={isEditing} />
      </Paper>
    </BoxCenter>
  );
};
