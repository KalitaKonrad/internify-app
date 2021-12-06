import { GetServerSideProps, GetStaticProps } from 'next';
import { useAxios } from '../../src/hooks/useAxios';
import { CompanyWithOwner } from '../../src/interfaces/Job';
import React, { useCallback } from 'react';
import ErrorPage from '@components/shared/ErrorPage';
import { useSession } from '../../src/hooks/useSession';
import useSWR from 'swr';
import { Box, Link, Paper, Typography } from '@material-ui/core';
import { MainJobInfo } from '@components/atoms/JobDetails/JobDetailsMainJobInfo';
import { DescriptionInfo } from '@components/atoms/JobDetails/JobDetailsDescriptionInfo';
import { BoxCenter } from '@components/atoms/BoxCenter';
import { makeStyles } from '@material-ui/core/styles';
import { JobOfferCard } from '@components/molecules/JobOfferCard';
import { CompanyOffers } from '@components/organisms/CompanyOffers';

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
  const axios = useAxios();

  const getCompanies = useCallback((url) => axios.get(url).then((res) => res.data), [axios]);

  const {
    data: { data = {} } = {},
    error,
    mutate,
  } = useSWR('jobs/', getCompanies, {
    revalidateOnFocus: false,
    revalidateIfStale: false,
  });
  // TODO: change
  const isCompany = true;

  if (!session) {
    return <ErrorPage />;
  }

  return (
    <BoxCenter flexDirection="column">
      <Paper className={classes.paper}>
        <Box>
          <Typography variant="h5">Email</Typography>
          <Typography variant="body1">{session.email}</Typography>
          <Box mt={2} />
          <Typography variant="h5">Username</Typography>
          <Typography variant="body1">{session.username}</Typography>
        </Box>
      </Paper>
      <Box mt={6} />

      {isCompany && <CompanyOffers />}
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
