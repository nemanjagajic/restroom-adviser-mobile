import { all, takeLatest } from 'redux-saga/effects';
import {
  USER_LOGIN,
  USER_SIGN_UP,
  USER_LOGOUT,
  USER_GOOGLE_LOGIN,
  USER_FACEBOOK_LOGIN,
  FORGOT_PASSWORD,
  RESET_PASSWORD,
  USER_GET,
  PASSWORD_CHANGE,
  USER_UPDATE,
  ADD_RESTROOM,
  FETCH_RESTROOMS,
  ADD_RESTROOM_COMMENT,
  GET_RESTROOM_COMMENTS,
  GET_RESTROOM_RATINGS,
  ADD_RESTROOM_RATING,
  GET_FEED_RESTROOMS,
  GET_OSM_SUGGESTIONS,
  GET_MY_FEED_RESTROOMS,
  GET_MY_COMMENTS,
  GET_MY_RATINGS
} from '../actions/ActionTypes';
import {
  userLogin,
  userSignUp,
  userLogout,
  userFacebookLogin,
  userGoogleLogin,
  forgotPassword,
  resetPassword,
  userGet,
  passwordChange,
  updateUser,
  getMyComments,
  getMyRatings
} from './ActiveUserSagas';
import {
  addRestroom,
  addRestroomComment,
  addRestroomRating,
  fetchRestrooms,
  getFeedRestrooms,
  getMyFeedRestrooms,
  getOsmSuggestions,
  getRestroomComments,
  getRestroomRatings
} from './RestroomSaga';

export default function* rootSaga() {
  yield all([
    takeLatest(USER_LOGIN, userLogin),
    takeLatest(USER_SIGN_UP, userSignUp),
    takeLatest(USER_LOGOUT, userLogout),
    takeLatest(USER_FACEBOOK_LOGIN, userFacebookLogin),
    takeLatest(USER_GOOGLE_LOGIN, userGoogleLogin),
    takeLatest(FORGOT_PASSWORD, forgotPassword),
    takeLatest(RESET_PASSWORD, resetPassword),
    takeLatest(USER_GET, userGet),
    takeLatest(PASSWORD_CHANGE, passwordChange),
    takeLatest(USER_UPDATE, updateUser),
    takeLatest(ADD_RESTROOM, addRestroom),
    takeLatest(FETCH_RESTROOMS, fetchRestrooms),
    takeLatest(ADD_RESTROOM_COMMENT, addRestroomComment),
    takeLatest(GET_RESTROOM_COMMENTS, getRestroomComments),
    takeLatest(GET_RESTROOM_RATINGS, getRestroomRatings),
    takeLatest(ADD_RESTROOM_RATING, addRestroomRating),
    takeLatest(GET_FEED_RESTROOMS, getFeedRestrooms),
    takeLatest(GET_MY_FEED_RESTROOMS, getMyFeedRestrooms),
    takeLatest(GET_OSM_SUGGESTIONS, getOsmSuggestions),
    takeLatest(GET_MY_COMMENTS, getMyComments),
    takeLatest(GET_MY_RATINGS, getMyRatings)
  ]);
}
