import React from 'react';
import { Button, PasswordInput, Input, } from '@ya.praktikum/react-developer-burger-ui-components';
import LoginStyle from './login.module.css'
import { Link, useLocation, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/hooks';
import { login } from '../../services/actions/auth'
import { TLocation } from '../../services/types/data'

function LoginPage() {
  const [valuePassword, setValuePassword] = React.useState('');
  const [valueEmail, setValueEmail] = React.useState('');

  const dispatch = useDispatch();
  const location = useLocation<TLocation>();

  const user = useSelector(
    state => {
      return state.user
    }
  )

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValuePassword(e.target.value)
  }

  const inputRef = React.useRef<HTMLInputElement>(null)

  const onIconClick = () => {
    const current = inputRef.current as HTMLInputElement

    setTimeout(() => current.focus(), 0)
    alert('Icon Click Callback')
  }

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    dispatch(login(valueEmail, valuePassword))
  }

  if (user.user) {
    return (
      <Redirect
        to={location.state?.from || '/'}
      />
    );
  }

  return (
    <>
      <form action="" className={`${LoginStyle.form}`} onSubmit={(e) => { submitForm(e) }}>
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
          <PasswordInput onChange={onChange} value={valuePassword} name={'password'} />
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