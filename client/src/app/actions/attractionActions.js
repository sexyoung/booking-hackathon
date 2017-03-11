import {
  SET_INDEX,
  GET_LIST,
  SET_LIST,
  SET_LOADING,
} from 'constants/attractionActionTypes';

export const setIndex   = payload => ({ type: SET_INDEX, payload });

export const getList    = () => ({ type: GET_LIST });

export const setList    = payload => ({ type: SET_LIST, payload });

export const setLoading = payload => ({ type: SET_LOADING, payload });

const attractionActions = {
  setIndex,
  getList,
  setList,
  setLoading,
};

export default attractionActions;
