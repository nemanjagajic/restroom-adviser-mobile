import {
  ADD_RESTROOM,
  ADD_RESTROOM_COMMENT,
  FETCH_RESTROOMS,
  SET_ADDING_COMMENT_FINISHED,
  SET_ADDING_COMMENT,
  SET_ADDING_RESTROOM,
  SET_FINISHED_ADDING_RESTROOM,
  SET_RESTROOMS,
  GET_RESTROOM_COMMENTS,
  SET_RESTROOM_COMMENTS,
  SET_FETCHING_COMMENTS,
  SET_FETCHING_COMMENTS_FINISHED,
  GET_RESTROOM_RATINGS,
  SET_FETCHING_RATINGS,
  SET_FETCHING_RATINGS_FINISHED,
  SET_RESTROOM_RATINGS
} from './ActionTypes';

export const addRestroom = payload => ({
  type: ADD_RESTROOM,
  payload
});

export const fetchRestrooms = () => ({
  type: FETCH_RESTROOMS
});

export const setRestrooms = payload => ({
  type: SET_RESTROOMS,
  payload
});

export const setAddingRestroom = () => ({
  type: SET_ADDING_RESTROOM
});

export const setFinishedAddingRestroom = () => ({
  type: SET_FINISHED_ADDING_RESTROOM
});

export const addRestroomComment = payload => ({
  type: ADD_RESTROOM_COMMENT,
  payload
});

export const setAddingComment = () => ({
  type: SET_ADDING_COMMENT
});

export const setAddingCommentFinished = () => ({
  type: SET_ADDING_COMMENT_FINISHED
});

export const getRestroomComments = payload => ({
  type: GET_RESTROOM_COMMENTS,
  payload
});

export const setRestroomComments = payload => ({
  type: SET_RESTROOM_COMMENTS,
  payload
});

export const setFetchingComments = () => ({
  type: SET_FETCHING_COMMENTS
});

export const setFetchingCommentsFinished = () => ({
  type: SET_FETCHING_COMMENTS_FINISHED
});

export const getRestroomRatings = payload => ({
  type: GET_RESTROOM_RATINGS,
  payload
});

export const setRestroomRatings = payload => ({
  type: SET_RESTROOM_RATINGS,
  payload
});

export const setFetchingRatings = () => ({
  type: SET_FETCHING_RATINGS
});

export const setFetchingRatingsFinished = () => ({
  type: SET_FETCHING_RATINGS_FINISHED
});
