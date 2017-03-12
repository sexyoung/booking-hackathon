import React from 'react'

import style from './style.scss'

class Marker extends React {
  static propTypes = {
    imgSrc: PropTypes.string.isRequired
  }

  render() {
    return (
      <img
        className={style.img}
        src=(this.props.imgSrc)
      />
    )
  }
}

export default Marker
