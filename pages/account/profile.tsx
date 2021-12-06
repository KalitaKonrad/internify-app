import { useAxios } from '../../src/hooks/useAxios';
import React, { useCallback } from 'react';
import ErrorPage from '@components/shared/ErrorPage';
import { useSession } from '../../src/hooks/useSession';
import useSWR from 'swr';
import { Box, Paper, Typography } from '@material-ui/core';
import { BoxCenter } from '@components/atoms/BoxCenter';
import { makeStyles } from '@material-ui/core/styles';
import { CompanyOffers } from '@components/organisms/CompanyOffers';
import { Line } from '@components/atoms/Line';
import { CompanyInfo } from '@components/molecules/CompanyInfo';
import { CompanyProfile } from '@components/organisms/CompanyProfile';

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    padding: 40,
    borderRadius: 10,
    width: '100%',
  },
}));

interface ProfilePageProps {
  isCompany?: boolean;
}

const Profile: React.FC<ProfilePageProps> = () => {
  const { session } = useSession();
  const classes = useStyles();

  // TODO: change
  const isCompany = true;

  if (!session) {
    return <ErrorPage />;
  }

  return isCompany ? (
    <CompanyProfile />
  ) : (
    <BoxCenter flexDirection="column">
      <Paper className={classes.paper}>
        <Box>
          <Line header="Email" description={session.email} />
          <Line header="Username" description={session.username} />
        </Box>
      </Paper>
      <Box mt={6} />
    </BoxCenter>
  );
};

export default Profile;
//
// export const getServerSideProps: GetServerSideProps<ProfilePageProps> = async () => {
//   const axios = useAxios();
//   try {
//     const {
//       data: { data },
//     } = await axios.get(`auth/me/`);
//
//     return {
//       props: {
//         company: data,
//       },
//     };
//   } catch (e) {
//     console.error(e);
//   }
//
//   return {
//     notFound: true,
//   };
// };
