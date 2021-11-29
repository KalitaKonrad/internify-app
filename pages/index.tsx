import React from 'react';
import { useAxios } from '../src/hooks/useAxios';
import { PaginatedData } from '../src/interfaces/PaginatedData';
import { JobWithCompanyAndOwner } from '../src/interfaces/Job';
import { JobOfferCard } from '@components/molecules/JobOfferCard';
import { BoxCenter } from '@components/atoms/BoxCenter';

interface HomeProps {
  data: PaginatedData<JobWithCompanyAndOwner>;
  status: number;
}

const Home: React.FC<HomeProps> = ({ data, status }) => {
  console.log({ data });

  return (
    <>
      {(data?.results || []).map((job) => {
        return (
          <BoxCenter my={1}>
            <JobOfferCard job={job} key={job.id} />
          </BoxCenter>
        );
      })}
    </>
  );
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
