import React, { PropTypes } from 'react';

import style from './style.scss';

class HotelComponent extends React.Component {
  static propTypes = {
    name: PropTypes.string,
    imgUrl: PropTypes.string,
    description: PropTypes.string,
  }

  static defaultProps = {
    name:        '',
    imgUrl:      '',
    description: '',
  }

  render() {
    const { imgUrl, name, description } = this.props;
    return (
      <div className={style.container}>
        <img
          className={style.img}
          src={imgUrl}
          alt={name}
        />
        <h1>{name}</h1>
        {description}
      </div>
    );
  }
}

export default HotelComponent;
