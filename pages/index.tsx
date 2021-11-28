import React from 'react';
import { useAxios } from '../src/hooks/useAxios';
import { PaginatedData } from '../src/interfaces/PaginatedData';
import { JobWithCompanyAndOwner } from '../src/interfaces/Job';
import { Avatar, Box, Paper, Typography } from '@material-ui/core';
import { BoxCenter } from '@components/atoms/BoxCenter';
import { makeStyles } from '@material-ui/core/styles';
import BusinessIcon from '@material-ui/icons/Business';
import RoomIcon from '@material-ui/icons/Room';
import { formatDistanceStrict, isToday } from 'date-fns';
import { JobOfferCard } from '@components/molecules/JobOfferCard';

interface HomeProps {
  data: PaginatedData<JobWithCompanyAndOwner>;
  status: number;
}

const Home: React.FC<HomeProps> = ({ data, status }) => {
  console.log({ data });

  return (
    <>
      {(data?.results || []).map((job) => {
        return <JobOfferCard job={job} />;
      })}
    </>
  );
  // return <>witam szefa</>;
};

export async function getStaticProps(context) {
  const axios = useAxios();

  const {
    data: { data },
    status,
  } = await axios.get('/jobs');
  console.log({ data });
  return {
    props: {
      data,
      status,
    }, // will be passed to the page component as props
  };
}

export default Home;
