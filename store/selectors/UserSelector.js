import { createSelector } from 'reselect';

const userStateSelector = state => state.userReducer;

export const userTokenSelector = createSelector(userStateSelector, user => user.userToken);
export const userSelector = createSelector(userStateSelector, user => user.user);
export const passwordChangedSelector = createSelector(
  userStateSelector,
  user => user.passwordChanged
);

export const myCommentsSelector = createSelector(
  userStateSelector,
  restrooms => restrooms.comments
);

export const isFetchingMyCommentsSelector = createSelector(
  userStateSelector,
  restrooms => restrooms.isFetchingMyComments
);

export const isFetchingMyNewCommentsSelector = createSelector(
  userStateSelector,
  restrooms => restrooms.isFetchingMyNewComments
);

export const myCommentsTotalNumberSelector = createSelector(
  userStateSelector,
  restrooms => restrooms.commentsTotalNumber
);
