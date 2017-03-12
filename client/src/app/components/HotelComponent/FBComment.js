import React, { PropTypes } from 'react';

import style from './style.scss'

const toStar = rating => {
  const stars = []
  for (let i = 0; i < rating; ++i) {
    stars.push(<span className={style['fb-blue-star']}>&#9733;</span>)
  }

  for (let i = 0; i < 5 - rating; ++i) {
    stars.push(<span className={style['fb-gray-star']}>&#9733;</span>)
  }

  return stars
}

export default class FBComment extends React.Component {
  static propTypes = {
    content: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    picUrl: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    // timestamp: PropTypes.number.isRequired,
    time: PropTypes.string.isRequired
  }

  render() {
    const { content, name, picUrl, rating, time } = this.props;
    return (
      <div className={style['fb-container']}>
        <img className={style['fb-img']} src={picUrl} alt={name} />
        <div className={style['fb-text']}>
          <div className={style['fb-name']}>{name}</div>
          {/* <span>{new Date(timestamp * 1000).toLocaleString()}</span> */}
          <p style={{margin: '0.5em 0'}}>
            <span className={style['fb-rating']}>{toStar(rating)}</span>
            <span className={style['fb-time']}>&nbsp;·&nbsp;{time}</span>
          </p>
          <p>Comment: {content}</p>
        </div>
      </div>
    );
  }
}
