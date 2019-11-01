import {
  SET_ADDING_COMMENT_FINISHED,
  SET_ADDING_COMMENT,
  SET_ADDING_RESTROOM,
  SET_FINISHED_ADDING_RESTROOM,
  SET_RESTROOMS,
  SET_FETCHING_COMMENTS,
  SET_FETCHING_COMMENTS_FINISHED,
  SET_FETCHING_RATINGS,
  SET_FETCHING_RATINGS_FINISHED,
  SET_RESTROOM_RATINGS,
  SET_ADDING_RATING,
  SET_ADDING_RATING_FINISHED,
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
  SET_OSM_SUGGESTIONS,
  SET_FETCHING_OSM_SUGGESTIONS,
  SET_FINISHED_FETCHING_OSM_SUGGESTIONS,
  ADD_MY_FEED_RESTROOMS,
  RESET_MY_FEED_RESTROOMS,
  SET_FETCHING_MY_FEED_RESTROOMS,
  SET_FETCHING_MY_FEED_RESTROOMS_FINISHED,
  SET_FETCHING_MY_NEW_FEED_RESTROOMS,
  SET_FETCHING_MY_NEW_FEED_RESTROOMS_FINISHED,
  SET_OPENED_RESTROOM_BOOKMARKED,
  SET_OPENED_RESTROOM_NOT_BOOKMARKED,
  SET_FETCHING_BOOKMARK_INFO,
  SET_FETCHING_BOOKMARK_INFO_FINISHED,
  SET_ADDING_BOOKMARK_INFO,
  SET_ADDING_BOOKMARK_INFO_FINISHED
} from '../actions/ActionTypes';

const initialState = {
  restrooms: [],
  feedRestrooms: [],
  feedRestroomsTotalNumber: 0,
  myFeedRestrooms: [],
  myFeedRestroomsTotalNumber: 0,
  isAddingRestroom: false,
  isAddingComment: false,
  comments: [],
  commentsTotalNumber: 0,
  isFetchingComments: false,
  isFetchingNewComments: false,
  isFetchingRatings: false,
  ratings: {},
  isAddingRating: false,
  isFetchingFeedRestrooms: false,
  isFetchingNewFeedRestrooms: false,
  isFetchingMyFeedRestrooms: false,
  isFetchingMyNewFeedRestrooms: false,
  osmSuggestions: [],
  isFetchingOsmSuggestions: false,
  isOpenedRestroomBookmarked: false,
  isFetchingBookmarkInfo: false,
  isAddingBookmarkInfo: false
};

export default (state = initialState, action) => {
  /*eslint-disable indent */
  switch (action.type) {
    case SET_RESTROOMS:
      return {
        ...state,
        restrooms: action.payload
      };
    case SET_ADDING_RESTROOM:
      return {
        ...state,
        isAddingRestroom: true
      };
    case SET_FINISHED_ADDING_RESTROOM:
      return {
        ...state,
        isAddingRestroom: false
      };
    case SET_ADDING_COMMENT:
      return {
        ...state,
        isAddingComment: true
      };
    case SET_ADDING_COMMENT_FINISHED:
      return {
        ...state,
        isAddingComment: false
      };

    case ADD_RESTROOM_COMMENTS:
      return {
        ...state,
        comments: state.comments.concat(action.payload.comments),
        commentsTotalNumber: action.payload.numberOfComments
      };
    case SET_FETCHING_COMMENTS:
      return {
        ...state,
        isFetchingComments: true
      };
    case SET_FETCHING_COMMENTS_FINISHED:
      return {
        ...state,
        isFetchingComments: false
      };
    case RESET_RESTROOM_COMMENTS:
      return {
        ...state,
        comments: []
      };
    case SET_FETCHING_RATINGS:
      return {
        ...state,
        isFetchingRatings: true
      };
    case SET_FETCHING_RATINGS_FINISHED:
      return {
        ...state,
        isFetchingRatings: false
      };
    case SET_RESTROOM_RATINGS:
      return {
        ...state,
        ratings: action.payload
      };
    case SET_ADDING_RATING:
      return {
        ...state,
        isAddingRating: true
      };
    case SET_ADDING_RATING_FINISHED:
      return {
        ...state,
        isAddingRating: false
      };
    case ADD_FEED_RESTROOMS:
      return {
        ...state,
        feedRestrooms: state.feedRestrooms.concat(action.payload.restrooms),
        feedRestroomsTotalNumber: action.payload.totalNumber
      };
    case ADD_MY_FEED_RESTROOMS:
      return {
        ...state,
        myFeedRestrooms: state.myFeedRestrooms.concat(action.payload.restrooms),
        myFeedRestroomsTotalNumber: action.payload.totalNumber
      };
    case RESET_FEED_RESTROOMS:
      return {
        ...state,
        feedRestrooms: []
      };
    case RESET_MY_FEED_RESTROOMS:
      return {
        ...state,
        myFeedRestrooms: []
      };
    case SET_FETCHING_FEED_RESTROOMS:
      return {
        ...state,
        isFetchingFeedRestrooms: true
      };
    case SET_FETCHING_MY_FEED_RESTROOMS:
      return {
        ...state,
        isFetchingMyFeedRestrooms: true
      };
    case SET_FETCHING_FEED_RESTROOMS_FINISHED:
      return {
        ...state,
        isFetchingFeedRestrooms: false
      };
    case SET_FETCHING_MY_FEED_RESTROOMS_FINISHED:
      return {
        ...state,
        isFetchingMyFeedRestrooms: false
      };
    case SET_FETCHING_NEW_FEED_RESTROOMS:
      return {
        ...state,
        isFetchingNewFeedRestrooms: true
      };
    case SET_FETCHING_MY_NEW_FEED_RESTROOMS:
      return {
        ...state,
        isFetchingMyNewFeedRestrooms: true
      };
    case SET_FETCHING_NEW_FEED_RESTROOMS_FINISHED:
      return {
        ...state,
        isFetchingNewFeedRestrooms: false
      };
    case SET_FETCHING_MY_NEW_FEED_RESTROOMS_FINISHED:
      return {
        ...state,
        isFetchingMyNewFeedRestrooms: false
      };
    case SET_FETCHING_NEW_COMMENTS:
      return {
        ...state,
        isFetchingNewComments: true
      };
    case SET_FETCHING_NEW_COMMENTS_FINISHED:
      return {
        ...state,
        isFetchingNewComments: false
      };
    case SET_OSM_SUGGESTIONS:
      return {
        ...state,
        osmSuggestions: action.payload
      };
    case SET_FETCHING_OSM_SUGGESTIONS:
      return {
        ...state,
        isFetchingOsmSuggestions: true
      };
    case SET_FINISHED_FETCHING_OSM_SUGGESTIONS:
      return {
        ...state,
        isFetchingOsmSuggestions: false
      };
    case SET_OPENED_RESTROOM_BOOKMARKED:
      return {
        ...state,
        isOpenedRestroomBookmarked: true
      };
    case SET_OPENED_RESTROOM_NOT_BOOKMARKED:
      return {
        ...state,
        isOpenedRestroomBookmarked: false
      };
    case SET_FETCHING_BOOKMARK_INFO:
      return {
        ...state,
        isFetchingBookmarkInfo: true
      };
    case SET_FETCHING_BOOKMARK_INFO_FINISHED:
      return {
        ...state,
        isFetchingBookmarkInfo: false
      };
    case SET_ADDING_BOOKMARK_INFO:
      return {
        ...state,
        isAddingBookmarkInfo: true
      };
    case SET_ADDING_BOOKMARK_INFO_FINISHED:
      return {
        ...state,
        isAddingBookmarkInfo: false
      };
    default:
      return state;
  }
};
