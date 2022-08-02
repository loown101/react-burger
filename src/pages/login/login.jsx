import React from 'react';
import { Button, PasswordInput, Input, } from '@ya.praktikum/react-developer-burger-ui-components';
import LoginStyle from './login.module.css'
import { Link } from 'react-router-dom';

function LoginPage() {
  const [value, setValue] = React.useState('password')

  const onChange = e => {
    setValue(e.target.value)
  }

  const [valueEmail, setValueEmail] = React.useState('e-mail')
  const inputRef = React.useRef(null)

  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0)
    alert('Icon Click Callback')
  }

  console.log('Логин')

  return (
    <>
      <form action="" className={`${LoginStyle.form}`}>
        <h2 className={`${LoginStyle.header} mb-6 text text_type_main-medium`}>Войти</h2>
        <div className={`${LoginStyle.input} mb-6 text text_type_main-small`}>
          <Input
            type={'email'}
            placeholder={'E-mail'}
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
        <div className={`${LoginStyle.input} mb-6 text text_type_main-small`}>
          <PasswordInput onChange={onChange} value={value} name={'password'} />
        </div>
        <Button>Войти</Button>

        <div className={`${LoginStyle.textContainer} text text_type_main-small mt-20 mb-4`}>
          <p className={`${LoginStyle.text} pr-2`}>Вы — новый пользователь?</p>
          <Link className={`${LoginStyle.link}`} to='/register'>Зарегистрироваться</Link>
        </div>
        <div className={`${LoginStyle.textContainer} text text_type_main-small mb-4`}>
          <p className={`${LoginStyle.text} pr-2`}>Забыли пароль?</p>
          <Link className={`${LoginStyle.link}`} to='/forgot-password'>Восстановить пароль</Link>
        </div>
      </form>
    </>
  )
}

export default LoginPage;