import React from 'react';
import { Button, PasswordInput, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import RegisterStyle from './register.module.css';
import { Link } from 'react-router-dom';

function RegisterPage() {
  const [value, setValue] = React.useState('password')

  const onChange = e => {
    setValue(e.target.value)
  }

  const [valueName, setValueName] = React.useState('имя')
  const [valueEmail, setValueEmail] = React.useState('e-mail')
  const inputRef = React.useRef(null)

  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0)
    alert('Icon Click Callback')
  }

  return (
    <>
      <form action="" className={`${RegisterStyle.form}`}>
        <h2 className={`${RegisterStyle.header} mb-6 text text_type_main-medium`}>Регистрация</h2>
        <div className={`${RegisterStyle.input} mb-6 text text_type_main-small`}>
          <Input
            type={'text'}
            placeholder={'Имя'}
            onChange={e => setValueName(e.target.value)}
            value={valueName}
            name={'name'}
            error={false}
            ref={inputRef}
            onIconClick={onIconClick}
            errorText={'Ошибка'}
            size={'default'}
          />
        </div>
        <div className={`${RegisterStyle.input} mb-6 text text_type_main-small`}>
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
        <div className={`${RegisterStyle.input} mb-6 text text_type_main-small`}>
          <PasswordInput onChange={onChange} value={value} name={'password'} />
        </div>
        <Button>Зарегистрироваться</Button>

        <div className={`${RegisterStyle.textContainer} text text_type_main-small mt-20 mb-4`}>
          <p className={`${RegisterStyle.text} pr-2`}>Уже зарегистрированы?</p>
          <Link className={`${RegisterStyle.link}`} to='/login'>Войти</Link>
        </div>
      </form>
    </>
  )
}

export default RegisterPage;