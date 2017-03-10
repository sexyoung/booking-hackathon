import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import AppActions from '../../actions/AppActions';

import MyComponent from '../../components/MyComponent';

import style from './counter-page.scss';

class CounterPage extends React.Component {

  static propTypes = {
    appActions:  PropTypes.object.isRequired,
    counter:     PropTypes.number.isRequired,
  };

  render() {
    return (
      <div className={style['counter-page']}>
        <h1>Counter Page</h1>
        <button
          className={style.button}
          onClick={() => this.props.appActions.placeholder(1)}
        >
          add
        </button>
        <MyComponent number={this.props.counter} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    counter: state.counter,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    appActions:  bindActionCreators(AppActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CounterPage);
