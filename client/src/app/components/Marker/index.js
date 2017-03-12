import React, { PropTypes } from 'react'

import style from './style.scss'

class Marker extends React.Component {
  static propTypes = {
    imgSrc: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  }

  render() {
    return (
      <img
        className={style.img}
        src={this.props.imgSrc}
        onClick={this.props.onClick}
      />
    )
  }
}

export default Marker
