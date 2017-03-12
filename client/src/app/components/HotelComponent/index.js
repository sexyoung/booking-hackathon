import React, { PropTypes } from 'react';
import { RaisedButton } from 'material-ui';

import FBComment from './FBComment';

import style from './style.scss';

class HotelComponent extends React.Component {
  static propTypes = {
    name:        PropTypes.string.isRequired,
    imgUrl:      PropTypes.string.isRequired,
    description: PropTypes.string,
    price:       PropTypes.number,
    bookingUrl:  PropTypes.string,
    FBComments:  PropTypes.array,
  }

  static defaultProps = {
    name:        '',
    imgUrl:      '',
    description: '',
    price:       0,
    bookingUrl:  '',
    FBComments:  [],
  }

  render() {
    const {
      imgUrl,
      name,
      description,
      price,
      bookingUrl,
      FBComments,
    } = this.props;
    return (
      <div className={style.container}>
        <img
          className={style.img}
          src={imgUrl}
          alt={name}
        />
        <h1>{name}</h1>
        {typeof price !== 'undefined' && `NTD ${price}`}
        {
          typeof bookingUrl !== 'undefined' &&
            <RaisedButton
              label="Book Now!"
              style={{ margin: '0 16px' }}
              backgroundColor="#003580"
              labelColor="#FFF"
              href={bookingUrl}
            />
        }
        {description}
        {FBComments.length > 0 && FBComments.map(comment => <FBComment key={comment.name} {...comment} />)}
      </div>
    );
  }
}

export default HotelComponent;
