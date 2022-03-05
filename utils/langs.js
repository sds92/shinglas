import ge from '../data/content.ge.json';
import en from '../data/content.en.json';

export const langs = (lang = 'ru') => {
  const locales = {
    en,
    ge,
  };
  return locales[lang];
};
