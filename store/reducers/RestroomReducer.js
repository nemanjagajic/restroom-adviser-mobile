import {
  SET_ADDING_COMMENT_FINISHED,
  SET_ADDING_COMMENT,
  SET_ADDING_RESTROOM,
  SET_FINISHED_ADDING_RESTROOM,
  SET_RESTROOMS,
  SET_RESTROOM_COMMENTS,
  SET_FETCHING_COMMENTS,
  SET_FETCHING_COMMENTS_FINISHED,
  SET_FETCHING_RATINGS,
  SET_FETCHING_RATINGS_FINISHED,
  SET_RESTROOM_RATINGS,
  SET_ADDING_RATING,
  SET_ADDING_RATING_FINISHED,
  ADD_FEED_RESTROOMS,
  RESET_FEED_RESTROOMS,
  SET_FETCHING_FEED_RESTROOMS,
  SET_FETCHING_FEED_RESTROOMS_FINISHED
} from '../actions/ActionTypes';

const initialState = {
  restrooms: [],
  feedRestrooms: [],
  feedRestroomsTotalNumber: 0,
  isAddingRestroom: false,
  isAddingComment: false,
  comments: [],
  isFetchingComments: false,
  isFetchingRatings: false,
  ratings: {},
  isAddingRating: false,
  isFetchingFeedRestrooms: false
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
    case SET_FETCHING_RATINGS:
      return {
        ...state,
        isFetchingRatings: true
      };
    case SET_FETCHING_RATINGS_FINISHED:
      return {
        ...state,
        isFetchingRatings: false
      };
    case SET_RESTROOM_RATINGS:
      return {
        ...state,
        ratings: action.payload
      };
    case SET_ADDING_RATING:
      return {
        ...state,
        isAddingRating: true
      };
    case SET_ADDING_RATING_FINISHED:
      return {
        ...state,
        isAddingRating: false
      };
    case ADD_FEED_RESTROOMS:
      return {
        ...state,
        feedRestrooms: state.feedRestrooms.concat(action.payload.restrooms),
        feedRestroomsTotalNumber: action.payload.totalNumber
      };
    case RESET_FEED_RESTROOMS:
      return {
        ...state,
        feedRestrooms: []
      };
    case SET_FETCHING_FEED_RESTROOMS:
      return {
        ...state,
        isFetchingFeedRestrooms: true
      };
    case SET_FETCHING_FEED_RESTROOMS_FINISHED:
      return {
        ...state,
        isFetchingFeedRestrooms: false
      };
    default:
      return state;
  }
};
