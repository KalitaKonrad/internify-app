import React from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import { theme } from '../theme';
import { Provider, signIn, signOut, useSession } from 'next-auth/client';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  React.useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);
  const [session, loading] = useSession();
  console.log({ session });
  return (
    <Provider session={pageProps.session}>
      <Head>
        <title>Internify</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        {!session ? (
          <>
            nto signed in <br />
            <button onClick={signIn}>Sign In</button>
          </>
        ) : (
          <>
            Signed in
            <button onClick={signOut}>Sign OUT</button>
          </>
          // <Component {...pageProps} />
        )}
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;
