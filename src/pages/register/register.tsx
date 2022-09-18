import React from 'react';
import { Button, PasswordInput, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import RegisterStyle from './register.module.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/hooks';
import { register } from '../../services/actions/auth'
import { useLocation, Redirect } from 'react-router-dom';
import { TLocation } from '../../services/types/data'

function RegisterPage() {
  const dispatch = useDispatch()
  const location = useLocation<TLocation>();

  const user = useSelector(
    state => {
      return state.user
    }
  )

  const [valuePassword, setValuePassword] = React.useState('')

  const onChange = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLInputElement;

    setValuePassword(target.value)
  }

  const [valueName, setValueName] = React.useState('')
  const [valueEmail, setValueEmail] = React.useState('')

  const inputRef = React.useRef<HTMLInputElement>(null)

  const onIconClick = () => {
    const current = inputRef.current as HTMLInputElement

    setTimeout(() => current.focus(), 0)
    alert('Icon Click Callback')
  }

  const submitForm = (e: React.SyntheticEvent) => {
    e.preventDefault()

    dispatch(register(valueEmail, valuePassword, valueName))
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
      <form action="" className={`${RegisterStyle.form}`} onSubmit={(e) => { submitForm(e) }}>
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
          <PasswordInput onChange={onChange} value={valuePassword} name={'password'} />
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