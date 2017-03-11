import React, { PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';

import style from './style.scss';

class HotelComponent extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    imgUrl: PropTypes.string.isRequired,
    description: PropTypes.string,
    price: PropTypes.number,
    bookingUrl: PropTypes.string,
    FBComments: PropTypes.array,
  }

  static defaultProps = {
    name:        '',
    imgUrl:      '',
    description: '',
  }

  render() {
    const { imgUrl, name, description, price, bookingUrl, FBComments } = this.props;
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
        {FBComments.map((comment, idx) => <FBComment key={idx} {...comment} />)}
      </div>
    );
  }
}

class FBComment extends React.Component {
  static propTypes = {
    content: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    picUrl: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    timestamp: PropTypes.number.isRequired,
  }

  render() {
    const {content, name, picUrl, rating, timestamp} = this.props
    return (
      <div>
        <img src={picUrl} />
        <span>{name}</span>
        <span>{new Date(timestamp * 1000).toLocaleString()}</span>
        <p>Rating: {rating}</p>
        <p>Comment: {content}</p>
      </div>
    )
  }
}

export default HotelComponent;
