import React, { PropTypes } from 'react';

export default class FBComment extends React.Component {
  static propTypes = {
    content: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    picUrl: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    timestamp: PropTypes.number.isRequired,
  }

  render() {
    const { content, name, picUrl, rating, timestamp } = this.props;
    return (
      <div>
        <img src={picUrl} alt={name} />
        <span>{name}</span>
        <span>{new Date(timestamp * 1000).toLocaleString()}</span>
        <p>Rating: {rating}</p>
        <p>Comment: {content}</p>
      </div>
    );
  }
}
