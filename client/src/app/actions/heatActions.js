import {
  HEAT_GET_LIST,
  HEAT_SET_LIST,
  HEAT_SET_LOADING,
} from 'constants/heatActionTypes';

export const getList    = payload => ({ type: HEAT_GET_LIST, payload });

export const setList    = payload => ({ type: HEAT_SET_LIST, payload });

export const setLoading = payload => ({ type: HEAT_SET_LOADING, payload });

const heatActions = {
  getList,
  setList,
  setLoading,
};

export default heatActions;
