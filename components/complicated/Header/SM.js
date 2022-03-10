import React from 'react';
import styles from './Burger.module.sass';

// etc
import { Icons, Logo } from '../';
import { Link } from 'react-scroll';
import Lang from '../Lang/Lang';

export default function SM(props) {
  const { theme, menu, data } = props;
  const [isActive, setIsActive] = React.useState(false);
  return (
    <>
      <nav className={`bg-${theme.bg.header} flex justify-between items-center h-16`}>
        <div className='basis-1/3'>
          <Icons.Menu
            extraClasses={`w-14 h-14 px-2 py-4 cursor-pointer active:scale-125 transition-all text-slate-100`}
            onClick={() => setIsActive(!isActive)}
          />
        </div>
        <div className={`basis-1/3 flex justify-center`}>
          <a className={`self-center`} href='#Main'>
            <Logo extraClasses={`w-10 h-10`} />
          </a>
        </div>
        <div className={`basis-1/3 px-2 flex`}>
          <div className={`flex bg-white rounded-md py-1 px-1 items-center mx-auto`}>
            <Lang {...props} />
          </div>
        </div>

        {isActive ? <div onClick={() => setIsActive(!isActive)} className={styles.overlay}></div> : ''}
      </nav>
      <div className={`relative`} style={{ marginTop: '-60px' }}>
        <nav
          style={{ top: '60px', left: 0, width: '200px' }}
          className={`${isActive ? `translate-x-0` : `-translate-x-72`} bg-${
            theme.bg.header
          } transition-all flex flex-col absolute h-screen z-50`}
        >
          <div className={`flex flex-col text-${theme.text.header} bg-${theme.bg.header}`}>
            {menu.map((item, index) => (
              <Link
                key={`MENUITEM${index}`}
                activeClass='active'
                to={item[1].replaceAll('#', '')}
                spy={true}
                smooth={true}
                offset={-65}
                duration={500}
                delay={0}
                isDynamic={true}
                ignoreCancelEvents={false}
                spyThrottle={500}
              >
                <div
                  onClick={() => setIsActive(!isActive)}
                  className={`cursor-pointer h-10 pl-4 uppercase flex items-center hover:text-${theme.text.buttons} hover:bg-${theme.bg.headerHoverLink} active:bg-${theme.bg.headerActiveLink}`}
                >
                  <a href='#main'>{item[0]}</a>
                </div>
              </Link>
            ))}
          </div>
          <div className={`flex flex-col mt-10 text-${theme.text.header}`}>
            <div className={`flex justify-center`}>
              <a className={`self-center`} href='#Main'>
                <Logo extraClasses={`w-20 h-20`} />
              </a>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
