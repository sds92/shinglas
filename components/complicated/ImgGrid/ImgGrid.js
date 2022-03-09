import React from 'react';
import Link from 'next/link';
import useInterval from '../../../utils/hooks/useInterval';

export default function ImgGrid(props) {
  const { theme, data, w } = props;
  const { gallery } = data.app.content;
  const imgs = gallery.imgGrid;
  const [state, setState] = React.useState({
    class: 'left-0',
    left: 0,
    duration: 30,
    px: 0,
    wEl: 1000,
    delay: 30000,
  });
  const classes = {
    imgLg: `object-fill min-h-full min-w-full`,
    imgSm: `object-fill min-h-full min-w-full`,
    gridItemLg: `row-span-2 rounded-md overflow-hidden shadow-md relative`,
    gridItemSm: `rounded-md overflow-hidden shadow-md relative`,
  };
  const ref = React.useRef();

  useInterval(() => {
    if (state.px !== 0) {
      setState((s) => ({ ...s, px: 0 }));
    } else {
      setState((s) => ({ ...s, px: window.innerWidth - ref.current.offsetWidth }));
    }
  }, state.delay);

  React.useEffect(() => {
    setState((s) => ({
      ...s,
      px: window.innerWidth - ref.current.offsetWidth,
      delay: (ref.current.offsetWidth - window.innerWidth) * 20,
    }));
    const action = () => {
      setState((s) => ({
        ...s,
        px: window.innerWidth - ref.current.offsetWidth,
        delay: (ref.current.offsetWidth - window.innerWidth) * 20,
      }));
    };
    window.addEventListener('resize', action);
    return () => window.removeEventListener('resize', action);
  }, []);

  const imagesSM = imgs.map((item) => ({
    src: `/images/${item}`,
    gridClasses: classes.gridItemSm,
    imgClasses: classes.imgSm,
  }));
  return (
    <div id={'Gallery'} className={`relative flex flex-col items-center bg-zinc-800 pt-4`}>
      <div
        className={`relative justify-center overflow-hidden zero:h-48 md:h-96`}
        style={{
          width: '100%',
        }}
      >
        <div
          ref={ref}
          className={`absolute flex gap-4 h-full`}
          style={{
            marginLeft: `${state.px}px`,
            // left: state.left,
            transitionDuration: `${state.delay}ms`,
            transitionProperty: 'all',
            transitionTimingFunction: 'linear',
          }}
        >
          {imagesSM.map((item, index) => (
            <div
              key={`GRIDIMG${index}`}
              className={`zero:w-48 md:w-96 rounded-md overflow-hidden shadow-md relative`}
              style={{
                background: `no-repeat url(.${item.src})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div className={`w-full h-full inset-0 absolute bg-black opacity-20`}></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
