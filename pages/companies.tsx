import React from 'react';
import { GetStaticProps } from 'next';
import ErrorPage from '@components/shared/ErrorPage';
import { CompanyWithOwner } from '../src/interfaces/Job';
import { useAxios } from '../src/hooks/useAxios';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CompanyCard from '@components/atoms/CompanyCard/CompanyCard';
import { PaginatedData } from '../src/interfaces/PaginatedData';

interface JobPageProps {
  data: PaginatedData<CompanyWithOwner>;
  notFound?: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      // flexGrow: 1,
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

  if (!data?.results || notFound) {
    return <ErrorPage />;
  }

  return (
    <div className={classes.root}>
      <Grid container>
        {data.results.map((company) => (
          <Grid item xs={12} sm={6} md={4}>
            {/*<Paper className={classes.paper}>*/}
            <CompanyCard company={company} />
            {/*</Paper>*/}
          </Grid>
        ))}
      </Grid>
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
