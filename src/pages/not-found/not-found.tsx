import React from 'react';
import NotFound404Style from './not-found.module.css'

function NotFound404() {
  return (
    <div className={`${NotFound404Style.container}`} >
      <p className={`${NotFound404Style.heading} text text_type_digits-large mb-8`} >Страница 404</p>
    </div>
  )
}

export default NotFound404;