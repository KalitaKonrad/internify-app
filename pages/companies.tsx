import React, { useState } from 'react';
import { GetStaticProps } from 'next';
import ErrorPage from '@components/shared/ErrorPage';
import { CompanyWithOwner } from '../src/interfaces/Job';
import { useAxios } from '../src/hooks/useAxios';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CompanyCard from '@components/atoms/CompanyCard/CompanyCard';
import { PaginatedData } from '../src/interfaces/PaginatedData';
import useSWR from 'swr';
import { BoxCenter } from '@components/atoms/BoxCenter';
import Pagination from '@material-ui/lab/Pagination';
import { SearchBar } from '@components/atoms/SearchBar';
import { Box } from '@material-ui/core';

interface JobPageProps {
  data: PaginatedData<CompanyWithOwner>;
  notFound?: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      // flexGrow: 1,
      padding: theme.spacing(4),
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }),
);

const CompaniesPage: React.FC<JobPageProps> = ({ data, notFound }) => {
  const classes = useStyles();
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState('');

  const onChange = (event, page: number) => {
    setCurrentPage(page);
  };

  const axios = useAxios();
  const fetcher = (url) => axios.get(url).then((res) => res.data);

  const { data: swrData, error } = useSWR(`companies/?page=${currentPage}${query ? `&q=${query}` : ''}`, fetcher);

  const totalPages = Math.ceil((swrData?.data?.count || data?.count) / 10);

  if (!data?.results || notFound) {
    return <ErrorPage />;
  }

  return (
    <div className={classes.root}>
      <Box flexGrow={1} mb={4} maxWidth={300}>
        <SearchBar
          onChange={(e) => {
            setCurrentPage(1);
            setQuery(e.target.value.trim());
          }}
        />
      </Box>
      <Grid container spacing={2}>
        {(swrData?.data?.results || data?.results).map((company) => (
          <Grid item xs={12} sm={6} md={4}>
            {/*<Paper className={classes.paper}>*/}
            <CompanyCard company={company} />
            {/*</Paper>*/}
          </Grid>
        ))}
      </Grid>

      <BoxCenter mt={4} mb={7}>
        <Pagination count={totalPages} color="primary" onChange={onChange} size="large" />
      </BoxCenter>
    </div>
  );
};

export default CompaniesPage;

export const getStaticProps: GetStaticProps<JobPageProps> = async () => {
  const axios = useAxios();

  try {
    const {
      data: { data },
    } = await axios.get('companies/');

    return {
      props: {
        data,
      },
    };
  } catch (e) {
    console.error(e);
  }

  return {
    notFound: true,
  };
};
