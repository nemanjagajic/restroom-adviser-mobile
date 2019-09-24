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

export const isAddingComment = createSelector(
  restroomStateSelector,
  restrooms => restrooms.isAddingComment
);

export const restroomCommentsSelector = createSelector(
  restroomStateSelector,
  restrooms => restrooms.comments
);

export const isFetchingCommentsSelector = createSelector(
  restroomStateSelector,
  restrooms => restrooms.isFetchingComments
);

export const restroomRatingsSelector = createSelector(
  restroomStateSelector,
  restrooms => restrooms.ratings
);

export const isFetchingRatingsSelector = createSelector(
  restroomStateSelector,
  restrooms => restrooms.isFetchingRatings
);

export const isAddingRatingSelector = createSelector(
  restroomStateSelector,
  restrooms => restrooms.isFetchingRatings
);
