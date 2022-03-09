import React from 'react';
import { Icons, Logo, Lang } from '..';
import { Link } from 'react-scroll';
import Social from '../Social/Social';
import styles from './LG.module.scss';

export default function LG(props) {
  const { theme, data, menu } = props;
  return (
    <nav className={`w-full bg-${theme.bg.header} font-montserrat`}>
      <div className={`max-w-7xl mx-auto flex justify-between items-center h-16`}>
        <div className={`flex flex-row items-center`}>
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
            <Logo className={`w-20 h-14 mr-4 cursor-pointer`} />
          </Link>
          {menu.map((item, index) => (
            <div
              key={`MENUITEM${index}`}
              className={`text-${theme.text.header} hover:text-${theme.text.hover} active:text-${theme.text.active} active:scale-105 transition-all duration-300`}
            >
              <Link
                activeClass={`text-${theme.text.hover}`}
                to={item[1].replaceAll('#', '')}
                spy={true}
                smooth={true}
                offset={-64}
                duration={100}
                delay={0}
                isDynamic={true}
                ignoreCancelEvents={false}
                spyThrottle={100}
              >
                <a className={`px-4 text-xl font-normal`} href={item[1]}>
                  {item[0].toUpperCase()}
                </a>
              </Link>
            </div>
          ))}
        </div>

        <div className={`flex bg-white rounded-md py-1 px-1 items-center ${styles.contacts}`}>
          <Social contacts={data.app.contacts} theme={theme} />
          <Lang {...props} />
        </div>
      </div>
    </nav>
  );
}
