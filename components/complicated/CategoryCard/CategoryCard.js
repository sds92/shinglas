import React from 'react';
import { Icons } from '..';
import { Text } from 'components/lib';

export default function CategoryCard(props) {
  const { category, products, app, categoryId } = props;
  const [state, setState] = React.useState({});

  React.useEffect(() => {
    setState({})
  }, [categoryId])

  return (
    <div className={`w-full flex zero:flex-col md:flex-row`}>
      <div className={`zero:basis-1 md:basis-1/2 border-r pr-4`}>
        <div className={`font-bold text-3xl my-4 text-center`}>{category.title}</div>
        <div className={`flex flex-col`}>
          <div className={`flex flex-wrap items-center justify-center`}>
            {category.imgs.map((item, i) => {
              return <img className={`rounded-md`} key={`dkfljhk${i}`} src={`images/${item}`}></img>;
            })}
          </div>
          <hr/>
          <div className={`text-center my-4`}>
            <Text>{category.desc}</Text>
          </div>
        </div>
      </div>
      <div className={`pl-4 zero:basis-1 md:basis-1/2`}>
        <div className={`font-bold text-3xl my-4`}>{app.content.catalog.categoryCard.rightTitle}:</div>
        <div className={`flex flex-col`}>
          {products.map((item, i) => {
            return (
              <div key={`PRODUCT${i}`} className={`w-full`}>
                <div
                  className={`flex items-center text-xl`}
                  onClick={() => setState((s) => ({ ...s, [i]: !state[i] }))}
                >
                  <Icons.ChevronDown
                    className={`transition-all active:scale-105 cursor-pointer w-8 h-8 border rounded-md bg-zinc-600 shadow-md text-white hover:bg-bp_red_2 ${
                      state[i] ? '' : '-rotate-90 '
                    }`}
                  />
                  <Text
                    style={{
                      height: '30px',
                    }}
                    className={`ml-2 px-1 pt-0.5 rounded-md hover:bg-bp_red hover:bg-opacity-70 cursor-pointer ${
                      state[i] ? 'bg-bp_red text-zinc-100 hover:bg-opacity-100 shadow-md' : 'text-zinc-900'
                    }`}
                  >
                    {item.title}
                  </Text>
                </div>
                <div
                  className={`flex flex-col ${
                    state[i] ? 'max-h-screen opacity-100' : 'h-0 opacity-0'
                  } overflow-hidden my-1 transition-all`}
                >
                  {item.img && <img className={`w-1/2`} src={`images/${item.img}`}></img>}
                  {item.desc.length !== 0 && (
                    <div className={`rounded-md shadow-md font-light text-zinc-50 bg-zinc-600 p-4 mt-1 border-zinc-600`}>
                      <Text>{item.desc}</Text>
                    </div>
                  )}
                  <div className={``}>
                    {item.options.map((option, ii) => {
                      return (
                        <div key={`FADACA${ii}`} className={`flex flex-col`}>
                          <div className={`h-7 py-1 whitespace-nowrap font-bold mt-2 rounded-md w-min text-zinc-900 px-2`}>{option.title}</div>
                          <div className={`ml-3`}>
                            {option.value.map((value, iii) => (
                              <div className={``} key={`GASHFDS${iii}`}>
                                {value}
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <hr/>
                  <br/>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
