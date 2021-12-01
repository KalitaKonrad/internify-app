import React, { useState } from 'react';
import { useAxios } from '../src/hooks/useAxios';
import { PaginatedData } from '../src/interfaces/PaginatedData';
import { JobWithCompanyAndOwner } from '../src/interfaces/Job';
import { JobOfferCard } from '@components/molecules/JobOfferCard';
import { BoxCenter } from '@components/atoms/BoxCenter';
import { Box, Container } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import useSWR from 'swr';
import { CustomSnackbar } from '@components/atoms/Snackbar';
import { PostJobForm } from '@components/organisms/PostJobForm';

interface HomeProps {
  data: PaginatedData<JobWithCompanyAndOwner>;
  status: number;
}

const Home: React.FC<HomeProps> = ({ data, status }) => {
  const totalPages = Math.ceil(data.count / 10);
  const [currentPage, setCurrentPage] = useState(1);

  const onChange = (event, page: number) => {
    setCurrentPage(page);
  };

  const axios = useAxios();
  const fetcher = (url) => axios.get(url).then((res) => res.data);

  const { data: swrData, error } = useSWR(`jobs/?page=${currentPage}`, fetcher);

  return (
    <>
      <Container maxWidth="sm">
        <PostJobForm
          onSubmit={(d) => {
            console.log(d);
            console.log('IONERHEHREHR');
          }}
        />
      </Container>
      {error && <CustomSnackbar open={!!error} message={error.message} />}
      <Box mt={3} />
      {(swrData?.data?.results || data?.results).map((job) => (
        <BoxCenter my={1} key={job.id}>
          <JobOfferCard job={job} />
        </BoxCenter>
      ))}

      <BoxCenter mt={4} mb={7}>
        <Pagination count={totalPages} color="primary" onChange={onChange} size="large" />
      </BoxCenter>
    </>
  );
};

export async function getStaticProps(context) {
  const axios = useAxios();

  const {
    data: { data },
    status,
  } = await axios.get('/jobs');

  return {
    props: {
      data,
      status,
    },
  };
}

export default Home;
