import Head from 'next/head';
import DefaultErrorPage from 'next/error';
import React from 'react';

const ErrorPage: React.FC = () => {
  return (
    <>
      <Head>
        <meta name="robots" content="noindex" />
      </Head>
      <DefaultErrorPage statusCode={404} />
    </>
  );
};

export default ErrorPage;
