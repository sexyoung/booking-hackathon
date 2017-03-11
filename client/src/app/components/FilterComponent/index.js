import React from 'react'
import Checkbox from 'material-ui/Checkbox';

import style from './style.scss'

const inputStyle = {
  display: 'inline-block',
  width: 'auto',
  marginRight: '8px'
}

const inputIconStyle = {
  marginRight: '4px'
}

const FilterComponent = ({heatChecked, scenaryChecked, hotelChecked}) => (
  <div className={style.container}>
    <Checkbox
      label="Heat"
      style={inputStyle}
      iconStyle={inputIconStyle}
      checked={heatChecked}
    />
    <Checkbox
      label="Scenaries"
      style={inputStyle}
      iconStyle={inputIconStyle}
      checked={scenaryChecked}
    />
    <Checkbox
      label="Hotels"
      style={inputStyle}
      iconStyle={inputIconStyle}
      checked={hotelChecked}
    />
  </div>
)

export default FilterComponent
