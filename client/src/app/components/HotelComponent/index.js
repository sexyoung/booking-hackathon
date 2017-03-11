import React from 'react'

import style from './style.scss'

const HotelComponent = ({imgUrl, name, description}) => (
  <div className={style['container']}>
    <img
      className={style['img']}
      src={imgUrl}
    />
    <h1>{name}</h1>
    {description}
  </div>
)

export default HotelComponent
