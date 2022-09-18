import React from 'react';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import ForgotPasswordStyle from './forgot-password.module.css';
import { Link, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/hooks';
import { forgotPassword } from '../../services/actions/password'

function ForgotPasswordPage() {
  const dispatch = useDispatch();

  const password = useSelector(
    state => {
      return state.password
    }
  )

  const user = useSelector(
    state => {
      return state.user
    }
  )

  const [valueEmail, setValueEmail] = React.useState('')
  const inputRef = React.useRef<HTMLInputElement>(null)

  const onIconClick = () => {
    const current = inputRef.current as HTMLInputElement

    setTimeout(() => current.focus(), 0)
  }

  const saveProfile = (e: React.SyntheticEvent) => {
    e.preventDefault()

    dispatch(forgotPassword(valueEmail))
  }

  if (user.user) {
    <Redirect to="/" />
  }

  if (password.isForgot) {
    return (
      <Redirect
        to={{
          pathname: "/reset-password",
        }}
      />
    );
  }

  return (
    <>
      <form action="" className={`${ForgotPasswordStyle.form}`} onSubmit={(e) => { saveProfile(e) }}>
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