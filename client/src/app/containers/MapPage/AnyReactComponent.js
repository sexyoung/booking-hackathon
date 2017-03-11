import React, { PropTypes } from 'react';

export default class AnyReactComponent extends React.Component {
  static propTypes = {
    text: PropTypes.string,
  }
  static defaultProps = {
    text: '',
  };
  render() {
    const { text } = this.props;
    return (
      <div>{text}</div>
    );
  }
}
