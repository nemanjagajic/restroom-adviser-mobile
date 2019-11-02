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
  SET_FETCHING_COMMENTS,
  SET_FETCHING_COMMENTS_FINISHED,
  GET_RESTROOM_RATINGS,
  SET_FETCHING_RATINGS,
  SET_FETCHING_RATINGS_FINISHED,
  SET_RESTROOM_RATINGS,
  SET_ADDING_RATING,
  SET_ADDING_RATING_FINISHED,
  ADD_RESTROOM_RATING,
  GET_FEED_RESTROOMS,
  ADD_FEED_RESTROOMS,
  RESET_FEED_RESTROOMS,
  SET_FETCHING_FEED_RESTROOMS,
  SET_FETCHING_FEED_RESTROOMS_FINISHED,
  SET_FETCHING_NEW_FEED_RESTROOMS_FINISHED,
  SET_FETCHING_NEW_FEED_RESTROOMS,
  SET_FETCHING_NEW_COMMENTS,
  SET_FETCHING_NEW_COMMENTS_FINISHED,
  ADD_RESTROOM_COMMENTS,
  RESET_RESTROOM_COMMENTS,
  GET_OSM_SUGGESTIONS,
  SET_OSM_SUGGESTIONS,
  SET_FETCHING_OSM_SUGGESTIONS,
  SET_FINISHED_FETCHING_OSM_SUGGESTIONS,
  GET_MY_FEED_RESTROOMS,
  ADD_MY_FEED_RESTROOMS,
  RESET_MY_FEED_RESTROOMS,
  SET_FETCHING_MY_FEED_RESTROOMS,
  SET_FETCHING_MY_FEED_RESTROOMS_FINISHED,
  SET_FETCHING_MY_NEW_FEED_RESTROOMS,
  SET_FETCHING_MY_NEW_FEED_RESTROOMS_FINISHED,
  BOOKMARK_RESTROOM,
  GET_IS_OPENED_RESTROOM_BOOKMARKED,
  SET_OPENED_RESTROOM_BOOKMARKED,
  SET_OPENED_RESTROOM_NOT_BOOKMARKED,
  SET_FETCHING_BOOKMARK_INFO,
  SET_FETCHING_BOOKMARK_INFO_FINISHED,
  SET_ADDING_BOOKMARK_INFO,
  SET_ADDING_BOOKMARK_INFO_FINISHED,
  ADD_MY_BOOKMARKED_RESTROOMS,
  RESET_MY_BOOKMARKED_RESTROOMS,
  UNBOOKMARK_RESTROOM
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

export const addRestroomComments = payload => ({
  type: ADD_RESTROOM_COMMENTS,
  payload
});

export const setFetchingComments = () => ({
  type: SET_FETCHING_COMMENTS
});

export const setFetchingCommentsFinished = () => ({
  type: SET_FETCHING_COMMENTS_FINISHED
});

export const setFetchingNewComments = () => ({
  type: SET_FETCHING_NEW_COMMENTS
});

export const setFetchingNewCommentsFinished = () => ({
  type: SET_FETCHING_NEW_COMMENTS_FINISHED
});

export const resetRestroomComments = () => ({
  type: RESET_RESTROOM_COMMENTS
});

export const getRestroomRatings = (payload, includeRatings = true, onRatingsFetched = null) => ({
  type: GET_RESTROOM_RATINGS,
  payload,
  includeRatings,
  onRatingsFetched
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

export const setAddingRating = () => ({
  type: SET_ADDING_RATING
});

export const setAddingRatingFinished = () => ({
  type: SET_ADDING_RATING_FINISHED
});

export const addRestroomRating = payload => ({
  type: ADD_RESTROOM_RATING,
  payload
});

export const getFeedRestrooms = payload => ({
  type: GET_FEED_RESTROOMS,
  payload
});

export const getMyFeedRestrooms = payload => ({
  type: GET_MY_FEED_RESTROOMS,
  payload
});

export const addFeedRestrooms = payload => ({
  type: ADD_FEED_RESTROOMS,
  payload
});

export const addMyFeedRestrooms = payload => ({
  type: ADD_MY_FEED_RESTROOMS,
  payload
});

export const addMyBookmarkedRestrooms = payload => ({
  type: ADD_MY_BOOKMARKED_RESTROOMS,
  payload
});

export const resetFeedRestrooms = () => ({
  type: RESET_FEED_RESTROOMS
});

export const resetMyFeedRestrooms = () => ({
  type: RESET_MY_FEED_RESTROOMS
});

export const resetMyBookmarkedRestrooms = () => ({
  type: RESET_MY_BOOKMARKED_RESTROOMS
});

export const setFetchingFeedRestrooms = () => ({
  type: SET_FETCHING_FEED_RESTROOMS
});

export const setFetchingMyFeedRestrooms = () => ({
  type: SET_FETCHING_MY_FEED_RESTROOMS
});

export const setFetchingFeedRestroomsFinished = () => ({
  type: SET_FETCHING_FEED_RESTROOMS_FINISHED
});

export const setFetchingMyFeedRestroomsFinished = () => ({
  type: SET_FETCHING_MY_FEED_RESTROOMS_FINISHED
});

export const setFetchingNewFeedRestrooms = () => ({
  type: SET_FETCHING_NEW_FEED_RESTROOMS
});

export const setFetchingMyNewFeedRestrooms = () => ({
  type: SET_FETCHING_MY_NEW_FEED_RESTROOMS
});

export const setFetchingNewFeedRestroomsFinished = () => ({
  type: SET_FETCHING_NEW_FEED_RESTROOMS_FINISHED
});

export const setFetchingMyNewFeedRestroomsFinished = () => ({
  type: SET_FETCHING_MY_NEW_FEED_RESTROOMS_FINISHED
});

export const getOsmSuggestions = payload => ({
  type: GET_OSM_SUGGESTIONS,
  payload
});

export const setOsmSuggestions = payload => ({
  type: SET_OSM_SUGGESTIONS,
  payload
});

export const setFetchingOsmSuggestions = () => ({
  type: SET_FETCHING_OSM_SUGGESTIONS
});

export const setFinishedFetchingOsmSuggestions = () => ({
  type: SET_FINISHED_FETCHING_OSM_SUGGESTIONS
});

export const bookmarkRestroom = payload => ({
  type: BOOKMARK_RESTROOM,
  payload
});

export const unbookmarkRestroom = payload => ({
  type: UNBOOKMARK_RESTROOM,
  payload
});

export const getIsOpenedRestroomBookmarked = payload => ({
  type: GET_IS_OPENED_RESTROOM_BOOKMARKED,
  payload
});

export const setOpenedRestroomBookmarked = () => ({
  type: SET_OPENED_RESTROOM_BOOKMARKED
});

export const setOpenedRestroomNotBookmarked = () => ({
  type: SET_OPENED_RESTROOM_NOT_BOOKMARKED
});

export const setFetchingBookmarkInfo = () => ({
  type: SET_FETCHING_BOOKMARK_INFO
});

export const setFetchingBookmarkInfoFinished = () => ({
  type: SET_FETCHING_BOOKMARK_INFO_FINISHED
});

export const setAddingBookmarkInfo = () => ({
  type: SET_ADDING_BOOKMARK_INFO
});

export const setAddingBookmarkInfoFinished = () => ({
  type: SET_ADDING_BOOKMARK_INFO_FINISHED
});
