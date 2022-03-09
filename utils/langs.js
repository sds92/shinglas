import appGE from '../data/app.ge.js';
import appEN from '../data/app.en.js';
import appFR from '../data/app.fr.js';
import productsGE from '../data/products.ge.js';
import productsEN from '../data/products.en.js';
import productsFR from '../data/products.fr.js';
import categoriesGE from '../data/categories.ge.js';
import categoriesEN from '../data/categories.en.js';
import categoriesFR from '../data/categories.fr.js';

export const langs = (lang = 'en') => {
  const locales = {
    en: {
      app: appEN,
      products: productsEN,
      categories: categoriesEN,
    },
    ge: {
      app: appGE,
      products: productsGE,
      categories: categoriesGE,
    },
    fr: {
      app: appFR,
      products: productsFR,
      categories: categoriesFR,
    },
  };
  return locales[lang];
};
