import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import style from './app.scss';
import logo from './booking-logo.png';

class App extends React.Component {

  static propTypes = {
    children: PropTypes.object,
  };

  static defaultProps = {
    children: null,
  }

  render() {
    return (
      <div className={style.app}>
        <header>
          <Link to="/">
            <img className={style.logo} src={logo} alt="logo" />
          </Link>
        </header>
        {this.props.children}
      </div>
    );
  }
}

export default App;
