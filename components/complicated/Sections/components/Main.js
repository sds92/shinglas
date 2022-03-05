import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Button, Text } from '../../../lib';
import { animations } from '../../../../styles/animations';
import { Logo } from '../../';

export default function Main(props) {
  const { theme, data, lgView, w } = props;
  const { main } = data.content;
  const { contacts } = data;
  const { ref, inView, entry } = useInView({
    threshold: 0,
  });


  return (
    <div
      id={`Main`}
      ref={ref}
      style={{ minHeight: '600px' }}
      className={`h-screen w-full flex items-center justify-between relative font-montserrat`}
    >
      <div className={`p-10 w-full md:w-6/12 flex items-center absolute md:relative inset-0 z-10`}>
        <div className={`max-w-xl ml-auto -mt-10 cursor-defaultflex-col`}>
          <div>
            {lgView ? (
              <>
                <motion.div
                  className={`font-bold text-3xl text-${theme.text.bodyTitle}`}
                  initial='initial'
                  animate='animate'
                  exit='exit'
                  variants={animations.slideUp.variants}
                  transition={animations.slideUp.transition}
                >
                  <Text className={`-ml-1 text-7xl whitespace-nowrap font-montserrat`}>{main.title[0]}</Text>
                  <Text className={`text-zinc-900 font-montserrat whitespace-nowrap`}>{main.title[1]}</Text>
                </motion.div>
                <motion.div
                  style={{ height: '1px' }}
                  className={`my-2 bg-${theme.text.body}`}
                  initial='initial'
                  animate='animate'
                  exit='exit'
                  variants={animations.line.variants}
                  transition={animations.line.transition}
                />
              </>
            ) : (
              <>
                <Text className={`font-bold text-center text-5xl text-${theme.text.bodyTitle}`}>
                  {main.title[0]}
                </Text>
                <div style={{ height: '1px' }} className={`mt-2 bg-${theme.text.body}`}></div>
                <Text className={`font-bold text-center text-2xl text-zinc-900`}>{main.title[1]}</Text>
              </>
            )}
          </div>
          <Text className={`${!lgView ? `text-center` : ``}`}>{main.subTitle}</Text>
          <br />
          <Text className={`my-4 font-light ${!lgView ? `text-center` : ``}`}>{main.text}</Text>
          <div
            className={`${lgView ? `` : `mx-auto`} ${theme.styles.buttons} text-${theme.text.buttons} bg-${theme.bg.buttons} hover:bg-bp_black active:scale-105 transition-colors`}
            href={'#Contacts'}
          >
            {main.button}
          </div>
        </div>
      </div>
      <div className={`mx-auto ${w >= 768 ? '' : 'opacity-30'}`}>
        <Logo className={`w-full h-full`}/>
      </div>
    </div>
  );
}
