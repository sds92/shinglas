import React from 'react';
import { Icons } from '..';

export default function Social(props) {
  const { contacts, theme } = props;
  return (
    <div className={`flex`}>
      {/* <div className={`text-${theme.text.header} hover:text-${theme.text.hover} text-xl transition-all `}>
        <a href={`tel:${contacts.phones[0]}`}>{contacts.phones[0]}</a>
      </div> */}
      {contacts.socials &&
        contacts.socials.map((item, index) => {
          const Icon = Icons[item[0]];
          return (
            <div className={`cursor-pointer mx-1 hover:scale-110 active:scale-110`} key={`SOCIAL${index}`}>
              <a target='_blank' href={`${item[1]}`} rel='noopener noreferrer'>
                <Icon extraClasses={`w-6 h-6`} />
              </a>
            </div>
          );
        })}
    </div>
  );
}
