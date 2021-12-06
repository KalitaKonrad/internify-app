import React, { useCallback } from 'react';
import { useSession } from '../../hooks/useSession';
import { BoxCenter } from '@components/atoms/BoxCenter';
import { JobOfferCard } from '@components/molecules/JobOfferCard';
import useSWR from 'swr';
import { useAxios } from '../../hooks/useAxios';
import { Box, Typography } from '@material-ui/core';

export const CompanyOffers: React.FC = () => {
  const { session } = useSession();
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

  const Offers = (
    <Box>
      <Typography variant="h5">My offers</Typography>
      {data?.results?.map((job) => (
        <BoxCenter my={1} key={job.id}>
          <JobOfferCard job={job} isOwner={true} />
        </BoxCenter>
      ))}
    </Box>
  );

  return <div>{Offers || <div>none</div>}</div>;
};
