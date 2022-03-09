import React from 'react';
import { Link } from 'react-scroll';
import Map from './Map';

import { Icons, Logo } from '..';
import { Text } from 'components/lib';

export default function Footer(props) {
  const { theme, data } = props;

  return (
    <>
      <footer className={`bg-zinc-800 overflow-hidden`}>
        <div className={`flex flex-col md:flex-row justify-between items-center h-full`}>
          <div className={`ml-0 sm:ml-10 md:ml-36 my-4`}>
            <Link
              activeClass={`text-${theme.text.hover}`}
              to={'Main'}
              spy={true}
              smooth={true}
              offset={-64}
              duration={100}
              delay={0}
              isDynamic={true}
              ignoreCancelEvents={false}
              spyThrottle={100}
            >
              <Logo extraClasses={`w-10 h-10 cursor-pointer`} />
            </Link>
          </div>

          <div className={`my-4 flex items-center gap-6 text-${theme.text.footer} cursor-default mr-2`}>
            <a target='_blank' rel='noopener noreferrer' href='https://roboweb.team/'>
              <Icons.Roboweb extraClasses={`w-10 h-10`} fill={`${theme.logoRoboWeb}`} />
            </a>
            <Text className={`text-zinc-100`}>{data.app.copyright}</Text>
          </div>
        </div>
      </footer>
    </>
  );
}
