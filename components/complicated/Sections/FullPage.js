import React from 'react';
import Sections from './components';
import { Link } from 'react-scroll';

export default function FullPage({ ...props }) {
  const { menu } = props;
  const [activeItem, setActiveItem] = React.useState(0);

  const handleSetActiveItem = (a) => {
    const b = menu.find((item, i) => {
      if (item[1].replaceAll('#', '') === a) {
        setActiveItem(i);
      }
    });
  };

  return (
    <>
      <div
        id={`scroll-spy`}
        style={{}}
        className={`z-50 mr-4 fixed flex flex-col justify-center gap-4 items-center h-screen w-4 top-0 right-0`}
      >
        {menu.map((item, i) => {
          return (
            <Link
              key={`SCROLLSPY${i}`}
              className={`${
                activeItem !== i ? `w-4 h-4  border-bp_gray_2` : `w-5 h-5 border-bp_red_2`
              }  rounded-full border cursor-pointer transition-all`}
              to={item[1].replaceAll('#', '')}
              spy={true}
              smooth={true}
              offset={-80}
              duration={100}
              delay={0}
              isDynamic={true}
              ignoreCancelEvents={false}
              spyThrottle={100}
              onSetActive={handleSetActiveItem}
              style={{
                ['-webkit-box-shadow']: activeItem == i && '0px 0px 15px 0px rgba(227, 20, 0, 0.2)',
                ['-moz-box-shadow']: activeItem == i && '0px 0px 15px 0px rgba(227, 20, 0, 0.2)',
                ['box-shadow']: activeItem == i && '0px 0px 15px 0px rgba(227, 20, 0, 0.2)',
              }}
            ></Link>
          );
        })}
      </div>
      <Sections.Main {...props} />
      <Sections.Catalog {...props} />
      {/* <Sections.Advantages {...props} /> */}
      {/* <Sections.Gallery {...props} /> */}
      {/* <Sections.Contacts {...props} /> */}
    </>
  );
}
