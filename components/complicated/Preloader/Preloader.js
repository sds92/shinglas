import React from 'react';
import { Logo } from '..';

export default function Preloader(props) {
  return (
    <div className='preloader'>
      <div className='preloader-logo'>
        <Logo className={`h-52 w-52 animate-bounce`} />
      </div>
    </div>
  );
}
