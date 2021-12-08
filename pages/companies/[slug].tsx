import { GetStaticProps } from 'next';
import { useAxios } from '../../src/hooks/useAxios';
import { CompanyWithOwner } from '../../src/interfaces/Job';
import React from 'react';
import ErrorPage from '@components/shared/ErrorPage';
import { CompanyProfile } from '@components/organisms/CompanyProfile';
import { BoxCenter } from '@components/atoms/BoxCenter';

interface CompanyPageProps {
  company: CompanyWithOwner;
  notFound?: boolean;
}

const Company: React.FC<CompanyPageProps> = ({ company, notFound }) => {
  if (!company || notFound) {
    return <ErrorPage />;
  }

  return (
    <BoxCenter>
      <CompanyProfile company={company} />
    </BoxCenter>
  );
};

export default Company;

export const getStaticProps: GetStaticProps<CompanyPageProps> = async ({ params }) => {
  if (!params?.slug || Array.isArray(params?.slug)) {
    return {
      notFound: true,
    };
  }

  const axios = useAxios();
  try {
    const {
      data: { data },
    } = await axios.get(`companies/${params.slug}/`);

    return {
      props: {
        company: data,
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

  const { data } = await axios.get('companies/');

  const companies: CompanyWithOwner[] = data.data.results;

  return {
    paths: companies.map(({ slug }) => ({ params: { slug } })),
    fallback: true,
  };
};
