import React from 'react';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import ProfileStyle from './profile.module.css';
import { Link, useHistory } from 'react-router-dom';
import { logout, editUser } from '../../services/actions/auth'
import { useDispatch, useSelector } from '../../services/hooks';

function ProfilePage() {
  const dispatch = useDispatch();
  const history = useHistory();

  const { user } = useSelector(
    state => {
      return state.user
    }
  )

  const [valueEmail, setValueEmail] = React.useState<string>('')
  const [valueName, setValueName] = React.useState<string>('')
  const [valuePassword, setValuePassword] = React.useState<string>('')
  const [disabledPassword, setDisabledPassword] = React.useState<boolean>(false)
  const [disabledName, setDisabledName] = React.useState<boolean>(false)
  const [disabledEmail, setDisabledEmail] = React.useState<boolean>(false)

  const inputRef = React.useRef<HTMLInputElement>(null)

  const onIconClick = () => {
    const current = inputRef.current as HTMLInputElement

    setTimeout(() => current.focus(), 0)
    setDisabledPassword(!disabledPassword)
  }

  const logoutProfile = (e: React.SyntheticEvent) => {
    e.preventDefault()

    dispatch(logout())

    history.replace({
      pathname: "/",
      state: {
        from: {
          pathname: "/",
        },
      },
    });
  }

  const saveProfile = (e: React.SyntheticEvent) => {
    e.preventDefault()

    dispatch(editUser(valueName, valueEmail, valuePassword))
    setDisabledPassword(false);
    setDisabledName(false);
    setDisabledEmail(false);
  }

  const resetForm = (e: React.SyntheticEvent) => {
    e.preventDefault()

    if (user) {
      setValueEmail(user?.email);
      setValueName(user?.name);
      setValuePassword('');
      setDisabledPassword(false);
      setDisabledName(false);
      setDisabledEmail(false);
    }
  }

  React.useEffect(
    () => {
      if (user) {
        setValueEmail(user?.email);
        setValueName(user?.name);
        setValuePassword('');
        setDisabledPassword(false);
        setDisabledName(false);
        setDisabledEmail(false);
      }
    },
    [user]
  );

  return (
    <section className={`${ProfileStyle.container} mt-20`}>
      <div className={`mt-20 pr-15`}>
        <ul className={`${ProfileStyle.list}`}>
          <li className={`mb-8`}><Link to='/profile' className={`${ProfileStyle.link} ${ProfileStyle.linkActive} text text_type_main-medium`}>Профиль</Link></li>
          <li className={`mb-8`}><Link to='/profile/orders' className={`${ProfileStyle.link} text text_type_main-medium`}>История заказов</Link></li>
          <li className={`mb-20`}><Link to='/' className={`${ProfileStyle.link} text text_type_main-medium`} onClick={logoutProfile}>Выход</Link></li>
        </ul>
        <p className={`${ProfileStyle.text} text text_type_main-default text_color_inactive`}>В этом разделе вы можете изменить свои персональные данные</p>
      </div>
      <form action="" className={`${ProfileStyle.form} mt-20`}>
        <div className={`${ProfileStyle.input} mb-6`}>
          <Input
            type={'text'}
            placeholder={'Имя'}
            onChange={e => setValueName(e.target.value)}
            value={valueName}
            name={'name'}
            error={false}
            ref={inputRef}
            onIconClick={() => setDisabledName(!disabledName)}
            errorText={'Ошибка'}
            size={'default'}
            disabled={!disabledName}
            icon={'EditIcon'}
          />
        </div>
        <div className={`${ProfileStyle.input} mb-6`}>
          <Input
            type={'email'}
            placeholder={'Логин'}
            onChange={e => setValueEmail(e.target.value)}
            value={valueEmail}
            name={'login'}
            error={false}
            ref={inputRef}
            onIconClick={() => setDisabledEmail(!disabledEmail)}
            errorText={'Ошибка'}
            size={'default'}
            disabled={!disabledEmail}
            icon={'EditIcon'}
          />
        </div>
        <div className={`${ProfileStyle.input} mb-6`}>
          <Input
            type={'password'}
            placeholder={'Пароль'}
            onChange={e => setValuePassword(e.target.value)}
            value={valuePassword}
            name={'password'}
            error={false}
            ref={inputRef}
            onIconClick={onIconClick}
            errorText={'Ошибка'}
            size={'default'}
            disabled={!disabledPassword}
            icon={'EditIcon'}
          />
        </div>
        <div className={`${ProfileStyle.containerButton}`}>
          <Button onClick={(e) => { resetForm(e) }}>Сброс</Button>
          <Button onClick={(e) => { saveProfile(e) }}>Сохранить</Button>
        </div>
      </form>
    </section>
  )
}

export default ProfilePage;