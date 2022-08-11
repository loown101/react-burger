import React from 'react';
import { Button, PasswordInput, Input, } from '@ya.praktikum/react-developer-burger-ui-components';
import LoginStyle from './login.module.css'
import { Link, useLocation, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../services/actions/auth'

function LoginPage() {
  const [valuePassword, setValuePassword] = React.useState('');
  const [valueEmail, setValueEmail] = React.useState('');

  const dispatch = useDispatch();

  const { user } = useSelector(
    state => state.user
  )

  const onChange = e => {
    setValuePassword(e.target.value)
  }

  const inputRef = React.useRef(null)

  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0)
    alert('Icon Click Callback')
  }

  const submitForm = (e) => {
    e.preventDefault()

    dispatch(login(valueEmail, valuePassword))
  }

  // let location = useLocation();

  // React.useEffect(() => {
  //   ga('send', 'pageview');
  // }, [location]);


  // if (user.user) {
  //   return (
  //     <Redirect
  //       to={state?.from || '/home'}
  //     />
  //   );
  // } видос Макса

  return (
    <>
      <form action="" className={`${LoginStyle.form}`}>
        <h2 className={`${LoginStyle.header} mb-6 text text_type_main-medium`} onSubmit={(e) => { submitForm(e) }}>Войти</h2>
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