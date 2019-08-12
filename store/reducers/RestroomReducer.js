import { SET_RESTROOMS } from '../actions/ActionTypes';

const initialState = {
  restrooms: []
};

export default (state = initialState, action) => {
  /*eslint-disable indent */
  switch (action.type) {
    case SET_RESTROOMS:
      return {
        ...state,
        restrooms: action.payload
      };
    default:
      return state;
  }
};
