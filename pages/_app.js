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
      ['Main', '#Main'],
      ['Products', '#Catalog'],
      ['Advantages', '#Advantages'],
      ['Usage', '#Gallery'],
      ['Contacts', '#Contacts'],
    ],
    w: w,
    data: data,
    lgView: w >= 900,
    theme: theme('black'),
    setLang,
    lang,
    ...pageProps,
  };
  console.log("🚀", newProps.data)

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
