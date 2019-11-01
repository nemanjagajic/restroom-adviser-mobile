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

export const myFeedRestroomsSelector = createSelector(
  restroomStateSelector,
  restrooms => restrooms.myFeedRestrooms
);

export const feedRestroomsTotalNumberSelector = createSelector(
  restroomStateSelector,
  restrooms => restrooms.feedRestroomsTotalNumber
);

export const myFeedRestroomsTotalNumberSelector = createSelector(
  restroomStateSelector,
  restrooms => restrooms.myFeedRestroomsTotalNumber
);

export const isFetchingFeedRestroomsSelector = createSelector(
  restroomStateSelector,
  restrooms => restrooms.isFetchingFeedRestrooms
);

export const isFetchingMyFeedRestroomsSelector = createSelector(
  restroomStateSelector,
  restrooms => restrooms.isFetchingMyFeedRestrooms
);

export const isFetchingNewFeedRestroomsSelector = createSelector(
  restroomStateSelector,
  restrooms => restrooms.isFetchingNewFeedRestrooms
);

export const isFetchingMyNewFeedRestroomsSelector = createSelector(
  restroomStateSelector,
  restrooms => restrooms.isFetchingMyNewFeedRestrooms
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
  restrooms => restrooms.isAddingRating
);

export const osmSuggestionsSelector = createSelector(
  restroomStateSelector,
  restrooms => restrooms.osmSuggestions
);

export const isFetchingOsmSuggestionsSelector = createSelector(
  restroomStateSelector,
  restrooms => restrooms.isFetchingOsmSuggestions
);

export const isOpenedRestroomBookmarkedSelector = createSelector(
  restroomStateSelector,
  restrooms => restrooms.isOpenedRestroomBookmarked
);

export const isFetchingBookmarkInfoSelector = createSelector(
  restroomStateSelector,
  restrooms => restrooms.isFetchingBookmarkInfo
);

export const isAddingBookmarkInfoSelector = createSelector(
  restroomStateSelector,
  restrooms => restrooms.isAddingBookmarkInfo
);
