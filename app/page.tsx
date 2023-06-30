'use client';
import Head from 'next/head';
import App from './components/App';
import GlobalStyles from './styles/GlobalStyles';
export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.cdnfonts.com/css/helvetica-neue-9"
          rel="stylesheet"
        />
        <link href="https://fonts.cdnfonts.com/css/axiforma" rel="stylesheet" />
      </Head>
      <GlobalStyles />

      <App />
      <div id="portal" />
    </>
  );
}
