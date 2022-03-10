import React from 'react';
import { useRouter } from 'next/router';
import styles from './FeedBack.module.css';

export default function FeedBack(props) {
  const { theme, data, contacts } = props;
  const router = useRouter();
  const [formStatus, setFormStatus] = React.useState('show');
  const [formState, setFormState] = React.useState({
    clientName: '',
    clientPhone: '',
    body: '',
    clientEmail: '',
  });
  const [checkFormStatus, setCheckFormStatus] = React.useState({
    0: false,
    1: false,
    2: false,
    3: false,
  });
  const classes = {
    ff: `w-full md:w-1/2 my-1 px-1`,
  };

  // TODO: beautify the logic of processing the unrequired fields
  async function checkForm() {
    let res = false;
    let a = Promise.resolve(/^[а-я, А-Я, a-z, A-Z]{3,20}$/.test(formState.clientName));
    // let b = Promise.resolve(/\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/.test(formState.clientPhone.replaceAll(' ', '')));
    let c = formState.body === '' ? true : Promise.resolve(/.{3,500}/.test(formState.body));
    let d = Promise.resolve(
            /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(
              formState.clientEmail
            )
          );
    const values_1 = await Promise.all([a, c, d]);
    res = true;
    values_1.map((item, index) => {
      if (!item) {
        res = false;
        setCheckFormStatus((state) => {
          return { ...state, [index]: true };
        });
        setTimeout(() => {
          setCheckFormStatus((state_1) => {
            return { ...state_1, [index]: false };
          });
        }, 3000);
      }
    });
    return res;
  }

  function resetForm() {
    setFormState({
      clientName: '',
      clientPhone: '',
      body: '',
      clientEmail: '',
    });
  }

  async function sendForm() {
    let check = await checkForm();
    if (!check) {
      return;
    }
    setFormStatus('pending');
    try {
      props.onFulfilled('loading');
    } catch (err) {}

    fetch(`${data.app.api.email}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...formState,
        fromSite: 'woodeco.site',
        to: contacts.emails[0],
      }),
    })
      .then((res) => {
        if (res.ok) {
          console.log('Succeeded!');
          resetForm();
        }
        if (!res.ok) {
          console.log('Error!');
          resetForm();
        }
        setTimeout(() => {
          return res;
        }, 1000);
      })
      .then(() => {
        setFormStatus('complete');
        try {
          props.onFulfilled('success');
        } catch (err) {}
        setTimeout(() => {
          setFormStatus('show');
        }, 4000);
      })
      .catch((err) => {
        setFormStatus('error');
        setTimeout(() => {
          setFormStatus('show');
          resetForm();
        }, 3000);
      });
  }

  return (
    <div>
      <form className={``}>
        {formStatus === 'show' && (
          <div className={`flex flex-wrap`}>
            <div className={`w-full px-1 my-1`}>
              <div className={`form-wrap`} style={{ position: 'relative' }}>
                {checkFormStatus[0] && <p className={styles.userFormAlert}>{contacts.form.errors.name}</p>}
                <input
                  className={`${styles.userFormInput} ${checkFormStatus[0] ? `${styles.userFormAlertBorders}` : ``}`}
                  required
                  id='FeedBackFormClientName'
                  placeholder={contacts.form.placeholders.name}
                  value={formState.clientName}
                  onChange={(e) =>
                    setFormState((state) => {
                      return { ...state, clientName: e.target.value };
                    })
                  }
                />
              </div>
            </div>
           
            <div className={`w-full px-1 my-1`}>
              <div className={`form-wrap`} style={{ position: 'relative' }}>
                {checkFormStatus[2] && (
                  <p className={styles.userFormAlert}></p>
                )}
                <textarea
                  className={`${styles.userFormInput} ${checkFormStatus[2] ? `${styles.userFormAlertBorders}` : ``}`}
                  id='FeedBackFormBody'
                  placeholder={contacts.form.placeholders.msg}
                  rows={4}
                  value={formState.body}
                  onChange={(e) =>
                    setFormState((state) => {
                      return { ...state, body: e.target.value };
                    })
                  }
                />
              </div>
            </div>

            <div className={classes.ff}>
              <div className={`form-wrap`} style={{ position: 'relative' }}>
                {checkFormStatus[3] && (
                  <p className={styles.userFormAlert}>{contacts.form.errors.email}</p>
                )}
                <input
                  className={`h-14 ${styles.userFormInput} ${checkFormStatus[3] ? `${styles.userFormAlertBorders}` : ``}`}
                  type='email'
                  id='FeedBackFormClientEmail'
                  placeholder={contacts.form.placeholders.email}
                  value={formState.clientEmail}
                  required
                  onChange={(e) =>
                    setFormState((state) => {
                      return { ...state, clientEmail: e.target.value };
                    })
                  }
                />
              </div>
            </div>
            <div className={`${classes.ff} cursor-pointer`}>
              <div
                onClick={sendForm}
                className={`cursor-pointer font-bold w-full whitespace-nowrap rounded-md shadow-md py-3.5 px-4 uppercase text-xl text-center text-${theme.text.buttons} bg-${theme.bg.buttons} hover:bg-${theme.bg.buttonsHover} active:scale-105`}
              >
                {contacts.form.sendButton}
              </div>
            </div>
          </div>
        )}
        {formStatus === 'pending' && <p className={`text-center py-10 text-zinc-100`}>{contacts.form.statuses.pending}</p>}
        {formStatus === 'complete' && (
          <p className={`text-center py-10 text-zinc-100`}>{contacts.form.statuses.success}Запрос успешно отправлен. Спасибо за обращение!</p>
        )}
        {formStatus === 'error' && (
          <p className={`text-center py-10 text-zinc-100`}>
            {contacts.form.statuses.error}Произошла ошибка. Попробуйте еще раз. Если ошибка повторится обратитесь к администрации сайта.
          </p>
        )}
      </form>
    </div>
  );
}
