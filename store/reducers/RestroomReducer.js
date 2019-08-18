import {
  SET_ADDING_RESTROOM,
  SET_FINISHED_ADDING_RESTROOM,
  SET_RESTROOMS
} from '../actions/ActionTypes';

const initialState = {
  restrooms: [],
  isAddingRestroom: false
};

export default (state = initialState, action) => {
  /*eslint-disable indent */
  switch (action.type) {
    case SET_RESTROOMS:
      return {
        ...state,
        restrooms: action.payload
      };
    case SET_ADDING_RESTROOM:
      return {
        ...state,
        isAddingRestroom: true
      };
    case SET_FINISHED_ADDING_RESTROOM:
      return {
        ...state,
        isAddingRestroom: false
      };
    default:
      return state;
  }
};
