import React, { PropTypes } from 'react';
import { RaisedButton } from 'material-ui';

import FBComment from './FBComment';

import style from './style.scss';

class HotelComponent extends React.Component {
  static propTypes = {
    type: PropTypes.oneOf(['hotel', 'place']).isRequired,
    name: PropTypes.string.isRequired,
    imgUrl: PropTypes.string.isRequired,
    description: PropTypes.string,
    price: PropTypes.number,
    rating: PropTypes.number,
    bookingUrl: PropTypes.string,
    FBComments: PropTypes.array,
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
      type,
      imgUrl,
      name,
      description,
      price,
      bookingUrl,
      FBComments,
      rating,
    } = this.props;
    const isHotel = type === 'hotel', isPlace = type === 'place'

    return (
      <div className={style.container}>
        <img
          className={style.img}
          src={imgUrl}
          alt={name}
        />
        <h1>{name}</h1>
        {
          isPlace &&
            <RaisedButton
              label="Save"
              style={{float: 'right'}}
              backgroundColor="#febb02"
              labelColor="#FFF"
            />
        }
        {
          isHotel &&
            <RaisedButton
              label="Book Now!"
              style={{float: 'right'}}
              backgroundColor="#003580"
              labelColor="#FFF"
              href={bookingUrl}
            />
        }
        <p style={{lineHeight: '36px'}}>
          <span className={style.rating}>{rating}<span className={style.star}>&#9733;&nbsp;</span></span>
          {isHotel && <span className={style.price}>NTD {price}</span>}
        </p>
        <div style={{clear: 'both'}} />
        <p className={style['desc']}>{description}</p>
        {FBComments.length > 0
          && (
            <div>
              <h2>Reviews from Facebook Friends</h2>
              {FBComments.map(comment => <FBComment key={comment.name} {...comment} />)}
            </div>
          )}
      </div>
    );
  }
}

export default HotelComponent;
