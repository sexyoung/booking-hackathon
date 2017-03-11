import React, { PropTypes } from 'react';

import style from './app.scss';

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
          logo, blablabla
        </header>
        {this.props.children}
      </div>
    );
  }
}

export default App;
