import React from 'react';
import ErrorPage from '@components/shared/ErrorPage';
import { UserType, useSession } from '../../src/hooks/useSession';
import { BoxCenter } from '@components/atoms/BoxCenter';
import { CompanyProfile } from '@components/organisms/CompanyProfile';
import { EmployeeProfile } from '@components/organisms/EmployeeProfile';
import { useAxios } from '../../src/hooks/useAxios';
import useSWR from 'swr';

const Profile: React.FC = () => {
  const { isAuth, userCompany, userType } = useSession();

  if (!isAuth) {
    return <ErrorPage />;
  }

  const axios = useAxios();
  const fetcher = (url) => axios.get(url).then((res) => res.data);

  const { data: { data = {} } = {}, error } = useSWR(`companies/${userCompany?.slug}/`, fetcher, {
    refreshInterval: 5000,
  });

  return userType === UserType.IS_COMPANY ? (
    <CompanyProfile company={data} isEditing />
  ) : (
    <BoxCenter flexDirection="column">
      <EmployeeProfile />
    </BoxCenter>
  );
};

export default Profile;
