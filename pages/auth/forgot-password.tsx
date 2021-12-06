import React from 'react';
import { BoxCenter } from '@components/atoms/BoxCenter';
import { ForgotPasswordForm } from '@components/organisms/ForgotPasswordForm';

const ForgotPasswordPage: React.FC = () => {
  return (
    <BoxCenter mt={12}>
      <ForgotPasswordForm />
    </BoxCenter>
  );
};

export default ForgotPasswordPage;
