import React from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import { theme } from '../src/theme';
import { MainLayout } from '@components/atoms/MainLayout';
import { DialogProvider } from '../src/hooks/useDialog';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  React.useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <Head>
        <title>Internify</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <DialogProvider>
          <MainLayout>
            <Component {...pageProps} />
          </MainLayout>
        </DialogProvider>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
