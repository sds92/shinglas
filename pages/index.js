import React from 'react';
import { Header, FullPage, Footer } from '../components/complicated';
import { motion } from 'framer-motion';
import { animations } from '../styles/animations';

export default function Home(props) {
  const newProps = props;
 
  return (
    <>
      <Header {...newProps} />
      <motion.div
        className={``}
        initial='initial'
        animate='animate'
        exit='exit'
        variants={animations.opacity.variants}
        transition={animations.opacity.transition}
      >
        <FullPage {...newProps} />
      </motion.div>
      <Footer {...newProps} />
    </>
  );
}
