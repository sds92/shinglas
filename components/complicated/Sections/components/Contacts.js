import React from 'react';
import { Icons } from '../../';
import { Text } from '../../../lib';
import { FeedBack } from '../../';
import ImgGrid from 'components/complicated/ImgGrid/ImgGrid';

export default function Contacts(props) {
  const { theme, data } = props;
  const { contacts } = data.app;
  const classes = {
    contactsTitle: `flex pb-1 items-center uppercase font-bold border-${theme.borders.contacts} text-${theme.text.contactsSubTitle} w-full`,
  };
  return (
    <div id={`Contacts`} className={`bg-${theme.bg.contacts} min-h-screen font-montserrat`}>
      
      <Text className={`py-10 zero:text-3xl sm:text-5xl text-center font-bold text-${theme.text.contactsTitle}`}>
        {contacts.title}
      </Text>

      <div className={`flex flex-col w-full`}>
        <div className={`w-full flex flex-col items-center sm:flex-row sm:gap-2 md:gap-10 my-2 `}>
          {/* FORM */}
          <div className={`w-full flex flex-col ml-auto sm:w-2/3 md:w-7/12 max-w-xl`}>
            <Text
              className={`zero:text-sm sm:text-xl text-center uppercase font-bold text-${theme.text.contactsSubTitle}`}
            >
              {contacts.formTitle}
            </Text>
            <FeedBack theme={theme} data={data} contacts={contacts}/>
          </div>

          {/* CONTACTS */}
          <div
            className={`flex w-full flex-wrap sm:max-w-xl sm:flex-col sm:w-1/3 md:w-5/12 p-2 mr-auto mt-10 text-${theme.text.contactsSubTitle}`}
          >
            <div className={`w-full my-1 flex flex-col `}>
              <div className={`flex mx-0.5 items-end`}>
                <Icons.User
                  extraClasses={`pl-1 w-8 h-8 border-${theme.text.contactsIcon} text-${theme.text.contactsIcon}`}
                />
                <p className={classes.contactsTitle}>{contacts.managers.title}</p>
              </div>
              <div style={{height: 1, width: '100%', background: `#ff0000`}} className={`-mt-1`}/>
              {contacts.managers.value.map((item, i) => {
                return (
                  <div key={`sdjfg${i}`} className={`ml-8 font-light my-1`}>
                    <div >{contacts.managers.value[i].name}</div>
                    <div className={`italic text-xs`}>{contacts.managers.value[i].pos}</div>
                    <a className={``} href={`tel:${contacts.phones[0]}`}>{contacts.phones.value[i]}</a>
                    
                  </div>
                  
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <ImgGrid {...props}/>
    </div>
  );
}
