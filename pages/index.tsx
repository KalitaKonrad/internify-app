import React from 'react';
import { signIn, signOut, useSession } from 'next-auth/client';

const Home: React.FC = (pageprops) => {
  const [session, loading] = useSession();

  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
  // return <>witam szefa</>;
};

export default Home;
