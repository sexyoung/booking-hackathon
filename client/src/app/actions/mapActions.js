import {
  SET_ZOOM,
  SET_LOCATION,
} from 'constants/mapActionTypes';

export const setZoom     = payload => ({ type: SET_ZOOM, payload });

export const setLocation = payload => ({ type: SET_LOCATION, payload });

const MapActions = {
  setZoom,
  setLocation,
};

export default MapActions;
