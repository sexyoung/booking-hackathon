import {
  HOTEL_SET_INDEX,
  HOTEL_GET_LIST,
  HOTEL_SET_LIST,
  HOTEL_SET_LOADING,
} from 'constants/hotelActionTypes';

export const setIndex   = payload => ({ type: HOTEL_SET_INDEX, payload });

export const getList    = payload => ({ type: HOTEL_GET_LIST, payload });

export const setList    = payload => ({ type: HOTEL_SET_LIST, payload });

export const setLoading = payload => ({ type: HOTEL_SET_LOADING, payload });

const HotelActions = {
  setIndex,
  getList,
  setList,
  setLoading,
};

export default HotelActions;
