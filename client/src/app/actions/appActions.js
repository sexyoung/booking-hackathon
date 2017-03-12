import {
  APP_SET_VALUE,
} from 'constants/appActionTypes';

export const setValue = payload => ({ type: APP_SET_VALUE, payload });

const AppActions = {
  setValue,
};

export default AppActions;
