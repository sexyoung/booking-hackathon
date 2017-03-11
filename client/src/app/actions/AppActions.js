import {
  INITIALIZE,
  PLACEHOLDER,
} from 'constants/ActionTypes';

export const initialize = () => ({ type: INITIALIZE });

export const placeholder = inc => ({ type: PLACEHOLDER, inc });

const AppActions = {
  initialize,
  placeholder,
};

export default AppActions;
