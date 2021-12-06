import React from 'react';
import { GetStaticProps } from 'next';
import ErrorPage from '@components/shared/ErrorPage';
import { useAxios } from '../../src/hooks/useAxios';
import { JobWithCompanyAndOwner } from '../../src/interfaces/Job';
import { JobDetailsMainCard } from '@components/atoms/JobDetails/MainCard';
import { BoxCenter } from '@components/atoms/BoxCenter';

interface JobPageProps {
  job: JobWithCompanyAndOwner;
  notFound?: boolean;
}

const JobPage: React.FC<JobPageProps> = ({ job, notFound }) => {
  if (!job || notFound) {
    return <ErrorPage />;
  }

  return (
    <BoxCenter mt={12}>
      <JobDetailsMainCard job={job} />
    </BoxCenter>
  );
};

export default JobPage;

export const getStaticProps: GetStaticProps<JobPageProps> = async ({ params }) => {
  if (!params?.slug || Array.isArray(params?.slug)) {
    return {
      notFound: true,
    };
  }

  const axios = useAxios();
  try {
    const {
      data: { data },
    } = await axios.get(`jobs/${params.slug}/`);

    return {
      props: {
        job: data,
      },
    };
  } catch (e) {
    console.error(e);
  }

  return {
    notFound: true,
  };
};

export const getStaticPaths = async () => {
  const axios = useAxios();

  const { data } = await axios.get('jobs/');

  const jobs: JobWithCompanyAndOwner[] = data.data.results;

  return {
    paths: jobs.map(({ slug }) => ({ params: { slug } })),
    fallback: true,
  };
};
