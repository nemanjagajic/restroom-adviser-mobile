import { createSelector } from 'reselect';

const restroomStateSelector = state => state.restroomReducer;

export const restroomsSelector = createSelector(
  restroomStateSelector,
  restrooms => restrooms.restrooms
);

export const feedRestroomsSelector = createSelector(
  restroomStateSelector,
  restrooms => restrooms.feedRestrooms
);

export const feedRestroomsTotalNumberSelector = createSelector(
  restroomStateSelector,
  restrooms => restrooms.feedRestroomsTotalNumber
);

export const isFetchingFeedRestroomsSelector = createSelector(
  restroomStateSelector,
  restrooms => restrooms.isFetchingFeedRestrooms
);

export const isFetchingNewFeedRestroomsSelector = createSelector(
  restroomStateSelector,
  restrooms => restrooms.isFetchingNewFeedRestrooms
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

export const isFetchingNewCommentsSelector = createSelector(
  restroomStateSelector,
  restrooms => restrooms.isFetchingNewComments
);

export const commentsTotalNumberSelector = createSelector(
  restroomStateSelector,
  restrooms => restrooms.commentsTotalNumber
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

export const osmSuggestionsSelector = createSelector(
  restroomStateSelector,
  restrooms => restrooms.osmSuggestions
);

export const isFetchingOsmSuggestionsSelector = createSelector(
  restroomStateSelector,
  restrooms => restrooms.isFetchingOsmSuggestions
);
