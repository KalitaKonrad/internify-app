import React, { useEffect, useState } from 'react';
import { SignIn } from '@components/organisms/SignIn';
import { useAxios } from '../src/hooks/useAxios';

const Login: React.FC = () => {
  const [csrf, setCsrf] = useState('');
  const axios = useAxios();

  useEffect(() => {
    fetch('http://localhost:8000/api/account/csrf/', {
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
      .then((res) => setCsrf(res.headers.get('X-CSRFToken')))
      .catch((e) => console.log(e));
  }, []);

  console.log(csrf);
  console.log(axios.defaults.url);
  return <SignIn csrf={csrf} />;
};

export default Login;
