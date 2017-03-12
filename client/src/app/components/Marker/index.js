import React, { PropTypes } from 'react'

import style from './style.scss'

class Marker extends React.Component {
  static propTypes = {
    imgSrc: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    focused: PropTypes.bool.isRequired,
  }

  render() {
    const {imgSrc, onClick, focused} = this.props
    return (
      <img
        className={ `${ style.img } ${ focused && style.focused } `}
        src={imgSrc}
        onClick={onClick}
      />
    )
  }
}

export default Marker
