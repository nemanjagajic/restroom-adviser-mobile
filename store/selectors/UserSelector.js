import { createSelector } from 'reselect';

const userStateSelector = state => state.userReducer;

export const userTokenSelector = createSelector(userStateSelector, user => user.userToken);
export const userSelector = createSelector(userStateSelector, user => user.user);
export const passwordChangedSelector = createSelector(
  userStateSelector,
  user => user.passwordChanged
);

export const myCommentsSelector = createSelector(userStateSelector, users => users.comments);

export const isFetchingMyCommentsSelector = createSelector(
  userStateSelector,
  users => users.isFetchingMyComments
);

export const isFetchingMyNewCommentsSelector = createSelector(
  userStateSelector,
  users => users.isFetchingMyNewComments
);

export const myCommentsTotalNumberSelector = createSelector(
  userStateSelector,
  users => users.commentsTotalNumber
);

export const myRatingsSelector = createSelector(userStateSelector, users => users.ratings);

export const isFetchingMyRatingsSelector = createSelector(
  userStateSelector,
  users => users.isFetchingMyRatings
);

export const isFetchingMyNewRatingsSelector = createSelector(
  userStateSelector,
  users => users.isFetchingMyNewRatings
);

export const myRatingsTotalNumberSelector = createSelector(
  userStateSelector,
  users => users.ratingsTotalNumber
);

export const isAddingLikeInfoSelector = createSelector(
  userStateSelector,
  users => users.isAddingLikeInfo
);
