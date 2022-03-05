import React from 'react';

export default function Lang(props) {
  const { setLang, lang } = props;

  return (
    <div className={`flex text-zinc-900 items-center justify-center font-montserrat px-1 border-l`}>
      <div
        onClick={() => setLang('en')}
        className={`transition-all duration-75 cursor-pointer ${lang === 'en' ? 'font-bold text-xl text-bp_red' : ''}`}
      >
        EN
      </div>
      <div
        onClick={() => setLang('ge')}
        className={`transition-all duration-75 cursor-pointer ml-0.5 ${
          lang === 'ge' ? 'font-bold text-xl text-bp_red' : ''
        }`}
      >
        GE
      </div>
    </div>
  );
}
