import React, { useEffect } from 'react';

const Home: React.FC = (pageprops) => {
  useEffect(() => {
    fetch('http://localhost:8000/api/account/whoami/', {
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
      .then((c) => console.log(c))
      .catch((c) => console.log(c));
  }, []);
  return <>index</>;
  // return <>witam szefa</>;
};

export default Home;
