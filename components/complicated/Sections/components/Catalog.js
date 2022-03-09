import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

import { animations } from '../../../../styles/animations';
import { Button, Text } from '../../../lib';

import { CategoryCard } from '../../';

// react-menu
import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';

import { Icons } from '../../';

export default function Catalog(props) {
  const { theme, lgView, w, data } = props;
  const { catalog } = data.app.content;
  const { categories, products, app } = data;
  const [state, setState] = React.useState({
    chosenCategory: categories[0].id,
    chosenId: 0,
    hover: null,
    show: false,
    categoryOpen: {},
    openProduct: {},
  });

  const { ref, inView, entry } = useInView({
    threshold: 0,
  });

  return (
    <>
      <div id={`Products`} className={`cursor-default min-h-screen flex flex-col font-montserrat`}>
        <div>
          <motion.div
            className={`font-bold text-3xl text-${theme.text.bodyTitle}`}
            initial='initial'
            animate='animate'
            exit='exit'
            variants={animations.slideUp.variants}
            transition={animations.slideUp.transition}
          >
            <Text className={`zero:text-xl sm:text-5xl text-center font-bold my-4 text-zinc-900`}>
              {catalog.title}
            </Text>
          </motion.div>
          <Text className={`zero:text-sm sm:text-xl mt-2  text-center font-light`}>{catalog.subTitle}</Text>
          <Text className={`text-xl text-center font-light`}>{catalog.text}</Text>

          <div className={`w-full`}>
            <div
              className={`flex zero:flex-col zero:max-w-sm sm:max-w-full zero:mx-auto sm:flex-row flex-wrap items-center justify-center`}
            >
              <>
                {!lgView ? (
                  <Menu
                    menuButton={({ open }) => {
                      return (
                        <MenuButton
                          className={`my-4 ${theme.styles.buttons} text-${theme.text.buttons} bg-${theme.bg.buttons} hover:bg-${theme.bg.buttonsHover} active:scale-105`}
                        >
                          <Button
                            style={{ border: 'none' }}
                            onClick={() =>
                              setState((state) => {
                                return { ...state, show: !state.show };
                              })
                            }
                          >
                            Выбрать
                            <Icons.ChevronDown
                              extraClasses={`w-6 h-6 transition-all ${open ? `rotate-180` : ''}`}
                            />
                          </Button>
                        </MenuButton>
                      );
                    }}
                  >
                    {/* MOBILE MENU */}
                    {categories.map((item, index) => (
                      <MenuItem
                        key={`NAVLGINNER${index}`}
                        onClick={() => {
                          setState((state) => {
                            return { ...state, chosen: item.category, chosenId: item.id };
                          });
                        }}
                      >
                        &nbsp;{item.category}
                      </MenuItem>
                    ))}
                  </Menu>
                ) : (
                  // DESKTOP MENU
                  <>
                    <div className={`my-2 flex flex-wrap gap-6 justify-center relative max-w-7xl mx-auto`}>
                      {categories.map((item, index) => {
                        return (
                          <div
                            className={`cursor-pointer text-2xl text-zinc-700 font-light relative h-8`}
                            key={`LINK${index}`}
                            onClick={() => {
                              setState((state) => {
                                return { ...state, chosenCategory: item.id };
                              });
                            }}
                          >
                            <div className={`whitespace-nowrap text-transparent inset-0 text-center `}>
                              {item.title.toUpperCase()}
                              <div
                                className={`${
                                  state.chosenCategory === index
                                    ? `font-bold text-bp_red underline decoration-1 underline-offset-4 decoration-${theme.borders.catalogActive} `
                                    : 'text-zinc-800'
                                } text-center absolute inset-0  active:scale-x-105  active:text-${
                                  theme.text.bodyTitle
                                } active:font-normal`}
                              >
                                {item.title.toUpperCase()}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </>
                )}
              </>
            </div>
            <hr />
            <br />
            {/* CATALOG ITEMS */}
            <div className={`max-w-7xl mx-auto overflow-hidden flex flex-wrap items-center justify-center`}>
              <CategoryCard
                categoryId={state.chosenCategory}
                category={categories.find((item) => item.id === state.chosenCategory)}
                app={app}
                products={products.filter((item) => item.categoryId === state.chosenCategory)}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
