import React from 'react';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import ResetPasswordStyle from './reset-password.module.css';
import { Link, useLocation, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from '../../services/actions/password'

function ResetPasswordPage() {
  const dispatch = useDispatch();
  const location = useLocation();

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

  const [valuePassword, setValuePassword] = React.useState('')
  const [valueCode, setValueCode] = React.useState('')
  const inputRef = React.useRef(null)

  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0)
    alert('Icon Click Callback')
  }

  const sendForm = (e) => {
    e.preventDefault()

    dispatch(resetPassword(valuePassword, valueCode))
  }

  if (user.user) {
    <Redirect to="/" />
  }

  if (password.isForgot === false) {
    return (
      <Redirect
        to={{
          pathname: '/forgot-password'
        }}
      />
    );
  }

  if (password.isReset === true) {
    return (
      <Redirect
        to={{
          pathname: '/login'
        }}
      />
    );
  }

  return (
    <>
      <form action="" className={`${ResetPasswordStyle.form}`} onSubmit={(e) => { sendForm(e) }}>
        <h2 className={`${ResetPasswordStyle.header} mb-6 text text_type_main-medium`}>Восстановление пароля</h2>
        <div className={`${ResetPasswordStyle.input} mb-6 text text_type_main-small`}>
          <Input
            type={'password'}
            placeholder={'Введите новый пароль'}
            onChange={e => setValuePassword(e.target.value)}
            value={valuePassword}
            name={'newpassword'}
            error={false}
            ref={inputRef}
            onIconClick={onIconClick}
            errorText={'Ошибка'}
            size={'default'}
          />
        </div>
        <div className={`${ResetPasswordStyle.input} mb-6 text text_type_main-small`}>
          <Input
            type={'text'}
            placeholder={'Код из письма'}
            onChange={e => setValueCode(e.target.value)}
            value={valueCode}
            name={'code'}
            error={false}
            ref={inputRef}
            onIconClick={onIconClick}
            errorText={'Ошибка'}
            size={'default'}
          />
        </div>
        <Button>Восстановить</Button>

        <div className={`${ResetPasswordStyle.textContainer} text text_type_main-small mt-20 mb-4`}>
          <p className={`${ResetPasswordStyle.text} pr-2`}>Вспомнили пароль?</p>
          <Link className={`${ResetPasswordStyle.link}`} to='/login'>Войти</Link>
        </div>
      </form>
    </>
  )
}

export default ResetPasswordPage;