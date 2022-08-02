import React from 'react';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import ForgotPasswordStyle from './forgot-password.module.css';
import { Link } from 'react-router-dom';


function ForgotPasswordPage() {
  const [valueEmail, setValueEmail] = React.useState('e-mail')
  const inputRef = React.useRef(null)

  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0)
  }



  return (
    <>
      <form action="" className={`${ForgotPasswordStyle.form}`}>
        <h2 className={`${ForgotPasswordStyle.header} mb-6 text text_type_main-medium`}>Восстановление пароля</h2>
        <div className={`${ForgotPasswordStyle.input} mb-6 text text_type_main-small`}>
          <Input
            type={'email'}
            placeholder={'Укажите e-mail'}
            onChange={e => setValueEmail(e.target.value)}
            value={valueEmail}
            name={'email'}
            error={false}
            ref={inputRef}
            onIconClick={onIconClick}
            errorText={'Ошибка'}
            size={'default'}
          />
        </div>
        <Button>Восстановить</Button>

        <div className={`${ForgotPasswordStyle.textContainer} text text_type_main-small mt-20 mb-4`}>
          <p className={`${ForgotPasswordStyle.text} pr-2`}>Вспомнили пароль?</p>
          <Link className={`${ForgotPasswordStyle.link}`} to='/login'>Войти</Link>
        </div>
      </form>
    </>
  )
}

export default ForgotPasswordPage;