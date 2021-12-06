import React from 'react';
import { GetServerSideProps } from 'next';
import ErrorPage from '@components/shared/ErrorPage';
import { JobDetailsMainCard } from '@components/atoms/JobDetails/MainCard';
import { BoxCenter } from '@components/atoms/BoxCenter';
import { Typography } from '@material-ui/core';
import { ForgotPasswordForm } from '@components/organisms/ForgotPasswordForm';
import { NewPasswordForm } from '@components/organisms/NewPasswordForm';

interface ResetPasswordPageProps {
  uidb64: string;
  token: string;
  notFound?: boolean;
  error?: boolean;
}

const ResetPasswordPage: React.FC<ResetPasswordPageProps> = ({ uidb64, token, notFound, error }) => {
  if (error || !uidb64 || !token) {
    return (
      <BoxCenter mt={12}>
        <Typography variant="h5">Missing Data</Typography>
      </BoxCenter>
    );
  }

  if (notFound) {
    return <ErrorPage />;
  }

  return (
    <BoxCenter mt={12}>
      <NewPasswordForm uidb64={uidb64} token={token} />
    </BoxCenter>
  );
};

export default ResetPasswordPage;

export const getServerSideProps: GetServerSideProps<ResetPasswordPageProps> = async ({ query }) => {
  if (
    Array.isArray(query?.token_valid) ||
    (!Array.isArray(query?.token_valid) && query?.token_valid?.toLowerCase() === 'false')
  ) {
    return {
      props: {
        error: 'Token invalid',
      },
    };
  }

  const { uidb64, token } = query;

  return {
    props: {
      uidb64,
      token,
    },
  };

  return {
    notFound: true,
  };
};
