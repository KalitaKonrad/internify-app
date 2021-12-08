import React from 'react';
import ErrorPage from '@components/shared/ErrorPage';
import { UserType, useSession } from '../../src/hooks/useSession';
import { BoxCenter } from '@components/atoms/BoxCenter';
import { makeStyles } from '@material-ui/core/styles';
import { CompanyProfile } from '@components/organisms/CompanyProfile';
import { EmployeeProfile } from '@components/organisms/EmployeeProfile';

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    padding: 40,
    borderRadius: 10,
    width: '100%',
  },
}));

interface ProfilePageProps {
  isCompany?: boolean;
}

const Profile: React.FC<ProfilePageProps> = () => {
  const { isAuth, userEmployee, userType } = useSession();
  const classes = useStyles();

  if (!isAuth) {
    return <ErrorPage />;
  }

  return userType === UserType.IS_COMPANY ? (
    <CompanyProfile isEditing />
  ) : (
    <BoxCenter flexDirection="column">
      <EmployeeProfile />
    </BoxCenter>
  );
};

export default Profile;
