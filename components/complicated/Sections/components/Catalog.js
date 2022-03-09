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
  // const [products, categories, nested] = datafromDB;
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

  const arr = products.flat();
  console.log('🚀 ~ file: Catalog.js ~ line 230 ~ {arr.map ~ state.openProduct', state.openProduct);

  return (
    <>
      <div id={`Catalog`} className={`cursor-default min-h-screen flex flex-col font-montserrat`}>
        <div>
          <motion.div
            className={`font-bold text-3xl text-${theme.text.bodyTitle}`}
            initial='initial'
            animate='animate'
            exit='exit'
            variants={animations.slideUp.variants}
            transition={animations.slideUp.transition}
          >
            <Text className={`zero:text-xl sm:text-5xl text-center font-bold text-zinc-900`}>
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
                                  item.category === state.chosen
                                    ? `font-normal text-zinc-900 underline decoration-1 underline-offset-4 decoration-${theme.borders.catalogActive} `
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
            {lgView ? (
              <div className={`max-w-7xl mx-auto overflow-hidden flex flex-wrap items-center justify-center`}>
                <CategoryCard
                  category={categories.find((item) => item.id === state.chosenCategory)}
                  app={app}
                  products={products.filter(item => item.categoryId === state.chosenCategory)}
                />
                {/* <div className={`basis-1/2`}>
                  <div className={`flex flex-wrap w-full justify-center`}>
                    {arr.map((item, index) => {
                      return (
                        state.chosen === item.category && (
                          <motion.div
                            className={`basis-1/2 p-1`}
                            initial='initial'
                            animate='animate'
                            variants={animations.opacity.variants}
                            transition={animations.opacity.transition}
                          >
                            <>
                              <div
                                onMouseEnter={() =>
                                  setState((state) => {
                                    return { ...state, hover: index };
                                  })
                                }
                                onMouseLeave={() =>
                                  setState((state) => {
                                    return { ...state, hover: null };
                                  })
                                }
                                className={`relative overflow-hidden h-56 flex items-center justify-center shadow-md rounded-md`}
                              >
                                <img
                                  className={`${
                                    state.hover === index && `scale-105`
                                  }  duration-1000 transition-all`}
                                  src={`images/${item.imgs[0]}`}
                                  alt
                                />
                                {state.openProduct[index] && (
                                  <motion.div
                                    className={`overflow-hidden absolute w-full text-center bg-bp_black bg-opacity-10 ${
                                      state.openProduct[index] ? 'h-full' : 'h-0'
                                    }`}
                                    initial='initial'
                                    animate='animate'
                                    variants={animations.slideUp3.variants}
                                    transition={animations.slideUp3.transition}
                                  >
                                    {item.sizes.map((size, i) => (
                                      <div key={`GHSDFJH${i}`}>{size}</div>
                                    ))}
                                  </motion.div>
                                )}
                                <div
                                  className={`bottom-0 transition-all duration-1000 absolute cursor-pointer w-full ${
                                    state.openProduct[index] ? `bg-opacity-20` : ``
                                  } `}
                                  onClick={() =>
                                    setState((state) => {
                                      return {
                                        ...state,
                                        openProduct: { [index]: !state.openProduct[index] },
                                      };
                                    })
                                  }
                                >
                                  <div
                                    className={` pl-10 pr-4 py-1.5 font-bold flex justify-between uppercase ${
                                      state.hover === index
                                        ? ` text-zinc-100 bg-bp_red_2`
                                        : `text-zinc-900 bg-bp_red`
                                    }`}
                                  >
                                    {item.title}
                                    <Icons.ChevronDown
                                      extraClasses={`w-6 h-6 transition-all active:scale-110 ${
                                        state.openProduct[index] ? 'rotate-180' : ''
                                      }`}
                                    />
                                  </div>
                                </div>
                              </div>
                            </>
                          </motion.div>
                        )
                      );
                    })}
                  </div>
                </div> */}
                {/* <div className={`basis-1 self-start`}>
                  {Object.entries(catalog.items).map((item, i) => {
                    return (
                      state.chosenId === i && (
                        <motion.div
                          initial='initial'
                          animate='animate'
                          variants={animations.opacity.variants}
                          transition={animations.opacity.transition}
                        >
                          <motion.div
                            initial='initial'
                            animate='animate'
                            variants={animations.slideUp2.variants}
                            transition={animations.slideUp2.transition}
                          >
                            <Text
                              className={`zero:text-xl sm:text-5xl text-center font-bold text-bp_red whitespace-nowrap`}
                            >
                              {item[1].about.title}
                            </Text>
                          </motion.div>
                          <motion.div
                            initial='initial'
                            animate='animate'
                            variants={animations.slideUp3.variants}
                            transition={animations.slideUp3.transition}
                          >
                            <Text className={`text-center font-light text-zinc-900 overflow-hidden`}>
                              {item[1].about.text}
                            </Text>
                          </motion.div>
                        </motion.div>
                      )
                    );
                  })}
                </div> */}
              </div>
            ) : (
              <>
                <div className={`flex flex-wrap gap-6 w-full justify-center`}>
                  {arr.map((item, index) => {
                    return (
                      state.chosen === item.category && (
                        <motion.div
                          initial='initial'
                          animate='animate'
                          variants={animations.opacity.variants}
                          transition={animations.opacity.transition}
                        >
                          <>
                            <div
                              onMouseEnter={() =>
                                setState((state) => {
                                  return { ...state, hover: index };
                                })
                              }
                              onMouseLeave={() =>
                                setState((state) => {
                                  return { ...state, hover: null };
                                })
                              }
                              className={`relative overflow-hidden`}
                            >
                              <img
                                className={`${
                                  state.hover === index && `scale-105`
                                } duration-1000 transition-all`}
                                src={`images/${item.imgs[0]}`}
                                alt
                                width='370'
                                height='256'
                              />
                              <div
                                className={`absolute inset-0 bg-black ${
                                  state.hover === index ? `opacity-0` : `opacity-50`
                                } transition-all`}
                              ></div>
                              <div className={`absolute w-full bottom-6 text-slate-100`}>
                                <p
                                  className={`pl-10 pr-4 py-1.5 ${
                                    state.hover === index && `text-slate-800 bg-zinc-100 bg-opacity-70`
                                  }`}
                                >
                                  {item.title}
                                </p>
                              </div>
                            </div>
                          </>
                        </motion.div>
                      )
                    );
                  })}
                </div>
                <br />
                <hr />
                <br />
                {/* <div className={`max-w-7xl mx-auto grow overflow-hidden flex items-start justify-center`}>
                  {Object.entries(catalog.items).map((item, i) => {
                    return (
                      state.chosenId === i && (
                        <motion.div
                          initial='initial'
                          animate='animate'
                          variants={animations.opacity.variants}
                          transition={animations.opacity.transition}
                        >
                          <motion.div
                            initial='initial'
                            animate='animate'
                            variants={animations.slideUp2.variants}
                            transition={animations.slideUp2.transition}
                          >
                            <Text
                              className={`zero:text-xl sm:text-5xl text-center font-bold text-bp_red whitespace-nowrap`}
                            >
                              {item[1].about.title}
                            </Text>
                          </motion.div>
                          <motion.div
                            initial='initial'
                            animate='animate'
                            variants={animations.slideUp3.variants}
                            transition={animations.slideUp3.transition}
                          >
                            <Text className={`text-center font-light text-zinc-900 overflow-hidden`}>
                              {item[1].about.text}
                            </Text>
                          </motion.div>
                        </motion.div>
                      )
                    );
                  })}
                </div> */}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
