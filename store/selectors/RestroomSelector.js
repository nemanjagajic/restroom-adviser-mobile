import { createSelector } from 'reselect';

const restroomStateSelector = state => state.restroomReducer;

export const restroomsSelector = createSelector(
  restroomStateSelector,
  restrooms => restrooms.restrooms
);
