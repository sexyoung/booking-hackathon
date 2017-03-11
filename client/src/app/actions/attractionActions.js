import {
  ATTRACTION_SET_INDEX,
  ATTRACTION_GET_LIST,
  ATTRACTION_SET_LIST,
  ATTRACTION_SET_LOADING,
} from 'constants/attractionActionTypes';

export const setIndex   = payload => ({ type: ATTRACTION_SET_INDEX, payload });

export const getList    = payload => ({ type: ATTRACTION_GET_LIST, payload });

export const setList    = payload => ({ type: ATTRACTION_SET_LIST, payload });

export const setLoading = payload => ({ type: ATTRACTION_SET_LOADING, payload });

const attractionActions = {
  setIndex,
  getList,
  setList,
  setLoading,
};

export default attractionActions;
