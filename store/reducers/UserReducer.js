import {
  SET_ACTIVE_USER,
  USER_LOGOUT,
  USER_SET,
  PASSWORD_CHANGE_SUCCESS,
  USER_UPDATE_SET,
  SET_FETCHING_MY_COMMENTS,
  SET_FETCHING_MY_COMMENTS_FINISHED,
  SET_FETCHING_MY_NEW_COMMENTS,
  SET_FETCHING_MY_NEW_COMMENTS_FINISHED,
  ADD_MY_COMMENTS,
  RESET_MY_COMMENTS,
  SET_FETCHING_MY_RATINGS,
  SET_FETCHING_MY_RATINGS_FINISHED,
  SET_FETCHING_MY_NEW_RATINGS,
  SET_FETCHING_MY_NEW_RATINGS_FINISHED,
  ADD_MY_RATINGS,
  RESET_MY_RATINGS
} from '../actions/ActionTypes';

const initialState = {
  userToken: {},
  user: {},
  passwordChanged: false,
  isFetchingMyComments: false,
  isFetchingMyNewComments: false,
  comments: [],
  commentsTotalNumber: 0,
  isFetchingMyRatings: false,
  isFetchingMyNewRatings: false,
  ratings: [],
  ratingsTotalNumber: 0
};

export default (state = initialState, action) => {
  /*eslint-disable indent */
  switch (action.type) {
    case SET_ACTIVE_USER:
      return {
        ...state,
        userToken: action.payload
      };
    case USER_LOGOUT:
      return initialState;
    case USER_SET:
      return { ...state, user: action.payload };
    case USER_UPDATE_SET:
      return { ...state, user: { ...state.user, ...action.payload } };
    case PASSWORD_CHANGE_SUCCESS:
      return { ...state, passwordChanged: action.payload };
    case SET_FETCHING_MY_COMMENTS:
      return {
        ...state,
        isFetchingMyComments: true
      };
    case SET_FETCHING_MY_COMMENTS_FINISHED:
      return {
        ...state,
        isFetchingMyComments: false
      };
    case SET_FETCHING_MY_NEW_COMMENTS:
      return {
        ...state,
        isFetchingMyNewComments: true
      };
    case SET_FETCHING_MY_NEW_COMMENTS_FINISHED:
      return {
        ...state,
        isFetchingMyNewComments: false
      };
    case ADD_MY_COMMENTS:
      return {
        ...state,
        comments: state.comments.concat(action.payload.comments),
        commentsTotalNumber: action.payload.numberOfComments
      };
    case RESET_MY_COMMENTS:
      return {
        ...state,
        comments: []
      };

    case SET_FETCHING_MY_RATINGS:
      return {
        ...state,
        isFetchingMyRatings: true
      };
    case SET_FETCHING_MY_RATINGS_FINISHED:
      return {
        ...state,
        isFetchingMyRatings: false
      };
    case SET_FETCHING_MY_NEW_RATINGS:
      return {
        ...state,
        isFetchingMyNewRatings: true
      };
    case SET_FETCHING_MY_NEW_RATINGS_FINISHED:
      return {
        ...state,
        isFetchingMyNewRatings: false
      };
    case ADD_MY_RATINGS:
      return {
        ...state,
        ratings: state.comments.concat(action.payload.ratings),
        ratingsTotalNumber: action.payload.numberOfRatings
      };
    case RESET_MY_RATINGS:
      return {
        ...state,
        ratings: []
      };
    default:
      return state;
  }
};
