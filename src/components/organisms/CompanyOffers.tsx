import React, { useState } from 'react';
import { useSession } from '../../hooks/useSession';
import { BoxCenter } from '@components/atoms/BoxCenter';
import { JobOfferCard } from '@components/molecules/JobOfferCard';
import useSWR from 'swr';
import { useAxios } from '../../hooks/useAxios';
import Pagination from '@material-ui/lab/Pagination';
import { CompanyWithOwner } from '../../interfaces/Job';
import { Typography } from '@material-ui/core';

interface CompanyOffersProps {
  company: CompanyWithOwner;
  isEditing?: boolean;
}

export const CompanyOffers: React.FC<CompanyOffersProps> = ({ company, isEditing }) => {
  const { session } = useSession();

  const axios = useAxios();
  const fetcher = (url) => axios.get(url).then((res) => res.data);

  const [currentPage, setCurrentPage] = useState(1);

  const { data: swrData, error } = useSWR(`companies/${company?.slug}/offers/?page=${currentPage}`, fetcher);

  const totalPages = Math.ceil(swrData?.data?.count / 10 ?? 0);

  const onChange = (event, page: number) => {
    setCurrentPage(page);
  };

  if (!company) {
    return null;
  }

  return (
    <>
      {(swrData?.data?.results || []).map((job) => (
        <BoxCenter my={1} key={job.id}>
          <JobOfferCard job={job} isOwner={isEditing} />
        </BoxCenter>
      ))}

      <BoxCenter mt={4} mb={7}>
        {swrData?.data?.count > 0 ? (
          <Pagination count={totalPages} color="primary" onChange={onChange} size="large" />
        ) : (
          <Typography variant="h5">No offers</Typography>
        )}
      </BoxCenter>
    </>
  );
};
