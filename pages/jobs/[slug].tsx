import React from 'react';
import { StaticGenerationContentfulService } from '@components/contentful/staticGenerationContentfulService';
import { IWebPageFields } from '@generatedTypes/contentful';
import { Entry } from 'contentful';
import { GetStaticProps } from 'next';
import { Loader } from '@components/shared/Loader';
import { useRouter } from 'next/router';
import WebPageTemplate from '@components/webPageTemplate';
import WebPageWrapper from '@components/shared/WebPageWrapper';
import ErrorPage from '@components/shared/ErrorPage';
import { useAxios } from '../../src/hooks/useAxios';
import { PaginatedData } from '../../src/interfaces/PaginatedData';
import { JobWithCompanyAndOwner } from '../../src/interfaces/Job';

interface JobPageProps {
  job: JobWithCompanyAndOwner;
}

const JobPage: React.FC<JobPageProps> = ({ job }) => {
  const router = useRouter();

  if (!job) {
    return <ErrorPage />;
  }

  return <div>hehe</div>;
};

export default JobPage;

export const getStaticProps: GetStaticProps<JobPageProps> = async ({ params }) => {
  if (!params?.slug || Array.isArray(params?.slug)) {
    return {
      props: {
        notFound: true,
      },
    };
  }

  const axios = useAxios();
  try {
    const { data } = await axios.get(`jobs/${params.slug}/`);
  } catch (e) {
    console.error(e);
    return {};
  }

  return {
    props: {
      notFound: true,
    },
  };
  console.log(JSON.stringify(data, null, 2));
  // try {
  //   const contentfulService = new StaticGenerationContentfulService(preview);
  //
  //   const entries = await contentfulService.getAllEntriesBySlugAndType(params.slug, CONTENT_TYPE);
  //   const { items }: { items: Entry<IWebPageFields>[] } = entries;
  //
  //   if (!items || items.length === 0) {
  //     return {
  //       props: {
  //         preview,
  //         notFound: true,
  //       },
  //     };
  //   }
  //
  //   const {
  //     sys: { id: linkedWebPageId },
  //   } = items[0];
  //
  //   const parentEntries = await contentfulService.getLinkedParentEntries(linkedWebPageId);
  //
  //   const contentTypeName = parentEntries.items?.[0]?.sys?.contentType?.sys?.id;
  //   const contentFields = parentEntries.items?.[0]?.fields;
  //
  //   return {
  //     props: {
  //       preview,
  //       contentTypeName,
  //       contentFields,
  //     },
  //   };
  // } catch (e) {
  //   console.error(e);
  // }
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
