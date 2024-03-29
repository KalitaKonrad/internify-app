import React, { useState } from 'react';
import { useAxios } from '../src/hooks/useAxios';
import { PaginatedData } from '../src/interfaces/PaginatedData';
import { JobWithCompanyAndOwner } from '../src/interfaces/Job';
import { JobOfferCard } from '@components/molecules/JobOfferCard';
import { BoxCenter } from '@components/atoms/BoxCenter';
import { Box } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import useSWR from 'swr';
import { CustomSnackbar } from '@components/atoms/Snackbar';
import { SearchBar } from '@components/atoms/SearchBar';

interface HomeProps {
  data: PaginatedData<JobWithCompanyAndOwner>;
}

const Home: React.FC<HomeProps> = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const onChange = (event, page: number) => {
    setCurrentPage(page);
  };

  const [query, setQuery] = useState('');

  const axios = useAxios();
  const fetcher = (url) => axios.get(url).then((res) => res.data);

  const { data: swrData, error } = useSWR(`jobs/?page=${currentPage}${query ? `&q=${query}` : ''}`, fetcher);

  const totalPages = Math.ceil((swrData?.data?.count || data?.count) / 10);

  return (
    <BoxCenter flexDirection="column">
      {error && <CustomSnackbar open={!!error} message={error.message} severity="error" />}

      <Box flexDirection="column" justifyContent="flex-start">
        <Box flexGrow={1} mt={6} mb={4} maxWidth={300}>
          <SearchBar
            onChange={(e) => {
              setCurrentPage(1);
              setQuery(e.target.value.trim());
            }}
          />
        </Box>
        {(swrData?.data?.results || data?.results).map((job) => (
          <BoxCenter my={1} key={job.id}>
            <JobOfferCard job={job} />
          </BoxCenter>
        ))}
      </Box>

      <BoxCenter mt={4} mb={7}>
        <Pagination count={totalPages} color="primary" onChange={onChange} size="large" />
      </BoxCenter>
    </BoxCenter>
  );
};

export async function getStaticProps(context) {
  const axios = useAxios();

  const {
    data: { data },
  } = await axios.get('/jobs');

  return {
    props: {
      data,
    },
  };
}

export default Home;
