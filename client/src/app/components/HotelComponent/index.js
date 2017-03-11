import React, { PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';

import style from './style.scss';

class HotelComponent extends React.Component {
  static propTypes = {
    name: PropTypes.string,
    imgUrl: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.number,
    bookingUrl: PropTypes.string,
  }

  static defaultProps = {
    name:        '',
    imgUrl:      '',
    description: '',
  }

  render() {
    const { imgUrl, name, description, price, bookingUrl } = this.props;
    return (
      <div className={style.container}>
        <img
          className={style.img}
          src={imgUrl}
          alt={name}
        />
        <h1>{name}</h1>
        {typeof price !== 'undefined' && `NTD ${ price }`}
        {
          typeof bookingUrl !== 'undefined' &&
            <RaisedButton
              label="Book Now!"
              style={{margin: '0 16px'}}
              backgroundColor="#003580"
              labelColor="#FFF"
              href={bookingUrl}
            />
        }
        {description}
      </div>
    );
  }
}

export default HotelComponent;
