import React, { PropTypes } from 'react';

import greenStar from './green-pin.png';

export default class AnyReactComponent extends React.Component {
  static propTypes = {
    text: PropTypes.string,
  }
  static defaultProps = {
    text: '',
  };
  render() {
    return (
      <img src={greenStar} alt={greenStar} />
    );
  }
}
