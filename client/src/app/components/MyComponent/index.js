import React, { PropTypes } from 'react';
import style from './my-component.scss';

const MyComponent = ({ number }) => (
  <span className={style.templateTwo}>{number}</span>
);

MyComponent.propTypes = {
  number: PropTypes.number.isRequired
};

export default MyComponent;
