import { createSelector } from 'reselect';

const restroomStateSelector = state => state.restroomReducer;

export const restroomsSelector = createSelector(
  restroomStateSelector,
  restrooms => restrooms.restrooms
);

export const isAddingRestroomSelector = createSelector(
  restroomStateSelector,
  restrooms => restrooms.isAddingRestroom
);
