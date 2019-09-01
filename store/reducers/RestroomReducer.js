import {
  SET_ADDING_COMMENT_FINISHED,
  SET_ADDING_COMMENT,
  SET_ADDING_RESTROOM,
  SET_FINISHED_ADDING_RESTROOM,
  SET_RESTROOMS,
  SET_RESTROOM_COMMENTS,
  SET_FETCHING_COMMENTS,
  SET_FETCHING_COMMENTS_FINISHED
} from '../actions/ActionTypes';

const initialState = {
  restrooms: [],
  isAddingRestroom: false,
  isAddingComment: false,
  comments: [],
  isFetchingComments: false
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
    case SET_ADDING_COMMENT:
      return {
        ...state,
        isAddingComment: true
      };
    case SET_ADDING_COMMENT_FINISHED:
      return {
        ...state,
        isAddingComment: false
      };

    case SET_RESTROOM_COMMENTS:
      return {
        ...state,
        comments: action.payload
      };
    case SET_FETCHING_COMMENTS:
      return {
        ...state,
        isFetchingComments: true
      };
    case SET_FETCHING_COMMENTS_FINISHED:
      return {
        ...state,
        isFetchingComments: false
      };
    default:
      return state;
  }
};
