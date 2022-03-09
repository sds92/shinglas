import React from 'react';

export default function Lang(props) {
  const { setLang, lang } = props;

  return (
    <div className={`flex text-zinc-900 items-center justify-center font-montserrat px-1`}>
      <div
        onClick={() => setLang('en')}
        className={`pr-1  cursor-pointer ${lang === 'en' ? 'font-bold text-xl text-bp_red pb-0.5' : ''}`}
      >
        EN
      </div>
      <div
        onClick={() => setLang('ge')}
        className={`px-1.5 border-x  cursor-pointer ml-0.5 ${
          lang === 'ge' ? 'font-bold text-xl text-bp_red pb-0.5' : ''
        }`}
      >
        GE
      </div>
      <div
        onClick={() => setLang('fr')}
        className={`pl-1  cursor-pointer ml-0.5 ${
          lang === 'fr' ? 'font-bold text-xl text-bp_red pb-0.5' : ''
        }`}
      >
        FR
      </div>
    </div>
  );
}
