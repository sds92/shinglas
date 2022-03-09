import React from 'react';
import { Icons } from '..';
import { Text } from 'components/lib';

export default function CategoryCard(props) {
  const { category, products, app } = props;
  const [state, setState] = React.useState({});
  return (
    <div className={`w-full flex`}>
      <div className={`basis-1/2`}>{category.title}</div>
      <div className={`basis-1/2`}>
        {app.content.catalog.categoryCard.rightTitle}:
        <div className={`flex flex-col`}>
          {products.map((item, i) => {
            return (
              <div
                key={`PRODUCT${i}`}
                onClick={() => setState((s) => ({ ...s, [i]: !state[i] }))}
                className={`w-full`}
              >
                <div className={`flex items-center text-xl`}>
                  <Icons.ChevronDown
                    className={`transition-all active:scale-105 cursor-pointer w-8 h-8 border rounded-md bg-zinc-600 text-white ${
                      state[i] ? '' : '-rotate-90 '
                    }`}
                  />
                  <Text
                    style={{
                      height: '30px',
                    }}
                    className={`ml-2 px-1 pt-0.5 bg-bp_red rounded-md bg-opacity-50 hover:bg-opacity-70 cursor-pointer`}
                  >
                    {item.title}
                  </Text>
                </div>
                <div className={`flex flex-col ${state[i] ? 'max-h-screen' : 'h-0'}`}>
                  {item.options.map((option, ii) => {
                    return (
                      <div key={`FADACA${ii}`}>
                        {option.title}
                        {option.value.map((value, iii) => (
                          <div key={`GASHFDS${iii}`}>{value}</div>
                        ))}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
