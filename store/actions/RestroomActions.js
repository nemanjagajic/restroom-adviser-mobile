import {
  ADD_RESTROOM,
  ADD_RESTROOM_COMMENT,
  FETCH_RESTROOMS,
  SET_ADDING_RESTROOM,
  SET_FINISHED_ADDING_RESTROOM,
  SET_RESTROOMS
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
