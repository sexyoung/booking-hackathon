import React, { PropTypes } from 'react';
import { Checkbox } from 'material-ui';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import appActions from 'actions/appActions';

import style from './style.scss';

const inputStyle = {
  display: 'inline-block',
  width: 'auto',
  marginRight: '8px'
};

const inputIconStyle = {
  marginRight: '4px'
};

class FilterComponent extends React.Component {
  static propTypes = {
    appActions:     PropTypes.object,
    heatChecked:    PropTypes.boolean,
    scenaryChecked: PropTypes.boolean,
    hotelChecked:   PropTypes.boolean,
  }

  static defaultProps = {
    appActions:    {},
    heatChecked:    false,
    scenaryChecked: false,
    hotelChecked:   false,
  }

  onCheck = (value) => {
    this.props.appActions.setValue({
      [value]: !this.props[value]
    });
  }

  render() {
    const {
      heatChecked,
      scenaryChecked,
      hotelChecked,
    } = this.props;

    return (
      <div className={style.container}>
        <Checkbox
          label="Heat"
          style={inputStyle}
          iconStyle={inputIconStyle}
          checked={heatChecked}
          onCheck={() => this.onCheck('heatChecked')}
        />
        <Checkbox
          label="Scenaries"
          style={inputStyle}
          iconStyle={inputIconStyle}
          checked={scenaryChecked}
          onCheck={() => this.onCheck('scenaryChecked')}
        />
        <Checkbox
          label="Hotels"
          style={inputStyle}
          iconStyle={inputIconStyle}
          checked={hotelChecked}
          onCheck={() => this.onCheck('hotelChecked')}
        />
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    appActions: bindActionCreators(appActions, dispatch),
  };
}

export default connect(null, mapDispatchToProps)(FilterComponent);
