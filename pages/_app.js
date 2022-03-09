import React from 'react';

import '../styles/tailwind.css';
import { Head, Preloader, YM } from '../components/complicated';
import theme from '../utils/theme';
import { langs } from 'utils/langs';

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = React.useState(true);
  const [w, setW] = React.useState(undefined);
  const [lang, setLang] = React.useState('en') 
  const data = langs(lang);

  React.useEffect(() => {
    setW(window.innerWidth);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    window.addEventListener(
      'resize',
      () => {
        setW(window.innerWidth);
      },
      []
    );
  }, []);

  const newProps = {
    menu: [
      [data.app.menu[0], '#Main'],
      [data.app.menu[1], '#Products'],
      [data.app.menu[2], '#Gallery'],
      [data.app.menu[3], '#Contacts'],
    ],
    w: w,
    data: data,
    lgView: w >= 900,
    theme: theme('black'),
    setLang,
    lang,
    ...pageProps,
  };

  return (
    <>
      {loading && <Preloader {...newProps} />}
      {!loading && (
        <>
          <Head head={newProps.data.app.head} theme={newProps.theme}></Head>
          <Component {...newProps} />
        </>
      )}
    </>
  );
}

export default MyApp;
