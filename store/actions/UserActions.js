import {
  USER_LOGIN,
  USER_SIGN_UP,
  USER_LOGOUT,
  SET_ACTIVE_USER,
  USER_FACEBOOK_LOGIN,
  USER_GOOGLE_LOGIN,
  FORGOT_PASSWORD,
  RESET_PASSWORD,
  USER_GET,
  USER_SET,
  PASSWORD_CHANGE,
  PASSWORD_CHANGE_SUCCESS,
  USER_UPDATE,
  USER_UPDATE_SET,
  ADD_MY_COMMENTS,
  RESET_MY_COMMENTS,
  GET_MY_COMMENTS,
  SET_FETCHING_MY_NEW_COMMENTS,
  SET_FETCHING_MY_NEW_COMMENTS_FINISHED,
  SET_FETCHING_MY_COMMENTS,
  SET_FETCHING_MY_COMMENTS_FINISHED,
  GET_MY_RATINGS,
  SET_FETCHING_MY_RATINGS,
  SET_FETCHING_MY_RATINGS_FINISHED,
  SET_FETCHING_MY_NEW_RATINGS,
  SET_FETCHING_MY_NEW_RATINGS_FINISHED,
  ADD_MY_RATINGS,
  RESET_MY_RATINGS,
  LIKE_COMMENT,
  UNLIKE_COMMENT,
  SET_ADDING_LIKE_INFO,
  SET_ADDING_LIKE_INFO_FINISHED
} from './ActionTypes';

export const logout = () => {
  return {
    type: USER_LOGOUT
  };
};

export const login = user => {
  return {
    type: USER_LOGIN,
    payload: user
  };
};

export const signUp = user => {
  return {
    type: USER_SIGN_UP,
    payload: user
  };
};

export const setActiveUser = payload => {
  return {
    type: SET_ACTIVE_USER,
    payload
  };
};

export const facebookLogin = () => {
  return {
    type: USER_FACEBOOK_LOGIN
  };
};

export const googleLogin = () => {
  return {
    type: USER_GOOGLE_LOGIN
  };
};

export const passwordForgot = payload => {
  return {
    type: FORGOT_PASSWORD,
    payload
  };
};

export const passwordReset = payload => {
  return {
    type: RESET_PASSWORD,
    payload
  };
};

export const getUser = () => {
  return {
    type: USER_GET
  };
};

export const setUser = payload => {
  return {
    type: USER_SET,
    payload
  };
};

export const changePassword = payload => {
  return {
    type: PASSWORD_CHANGE,
    payload
  };
};

export const setChangePasswordSuccess = payload => {
  return {
    type: PASSWORD_CHANGE_SUCCESS,
    payload
  };
};

export const updateUser = payload => {
  return {
    type: USER_UPDATE,
    payload
  };
};

export const setUpdatedUser = payload => {
  return {
    type: USER_UPDATE_SET,
    payload
  };
};

export const getMyComments = payload => ({
  type: GET_MY_COMMENTS,
  payload
});

export const setFetchingMyComments = () => ({
  type: SET_FETCHING_MY_COMMENTS
});

export const setFetchingMyCommentsFinished = () => ({
  type: SET_FETCHING_MY_COMMENTS_FINISHED
});

export const setFetchingMyNewComments = () => ({
  type: SET_FETCHING_MY_NEW_COMMENTS
});

export const setFetchingMyNewCommentsFinished = () => ({
  type: SET_FETCHING_MY_NEW_COMMENTS_FINISHED
});

export const addMyComments = payload => ({
  type: ADD_MY_COMMENTS,
  payload
});

export const resetMyComments = () => ({
  type: RESET_MY_COMMENTS
});

export const getMyRatings = payload => ({
  type: GET_MY_RATINGS,
  payload
});

export const setFetchingMyRatings = () => ({
  type: SET_FETCHING_MY_RATINGS
});

export const setFetchingMyRatingsFinished = () => ({
  type: SET_FETCHING_MY_RATINGS_FINISHED
});

export const setFetchingMyNewRatings = () => ({
  type: SET_FETCHING_MY_NEW_RATINGS
});

export const setFetchingMyNewRatingsFinished = () => ({
  type: SET_FETCHING_MY_NEW_RATINGS_FINISHED
});

export const addMyRatings = payload => ({
  type: ADD_MY_RATINGS,
  payload
});

export const resetMyRatings = () => ({
  type: RESET_MY_RATINGS
});

export const likeComment = payload => ({
  type: LIKE_COMMENT,
  payload
});

export const unlikeComment = payload => ({
  type: UNLIKE_COMMENT,
  payload
});

export const setAddingLikeInfo = () => ({
  type: SET_ADDING_LIKE_INFO
});

export const setAddingLikeInfoFinished = () => ({
  type: SET_ADDING_LIKE_INFO_FINISHED
});
