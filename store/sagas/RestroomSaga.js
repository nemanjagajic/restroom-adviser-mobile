import { call, put, select } from 'redux-saga/effects';
import { restroomService } from '../../services/RestroomService';
import { userSelector } from '../selectors/UserSelector';
import {
  setAddingComment,
  setAddingCommentFinished,
  setAddingRestroom,
  setFetchingComments,
  setFetchingCommentsFinished,
  setFinishedAddingRestroom,
  setRestrooms,
  getRestroomRatings as getRestroomRatingsAction,
  setFetchingRatings,
  setFetchingRatingsFinished,
  setRestroomRatings,
  setAddingRating,
  setAddingRatingFinished,
  addFeedRestrooms,
  setFetchingFeedRestrooms,
  setFetchingFeedRestroomsFinished,
  resetFeedRestrooms,
  setFetchingNewFeedRestrooms,
  setFetchingNewFeedRestroomsFinished,
  setFetchingNewComments,
  setFetchingNewCommentsFinished,
  addRestroomComments,
  resetRestroomComments
} from '../actions/RestroomActions';
import NavigationService from '../../services/NavigationService';
import { FETCHING_LIMIT } from '../../constants/Restrooms';

export function* fetchRestrooms() {
  const user = yield select(userSelector);

  try {
    const restrooms = yield call(restroomService.fetchAll, user);
    yield put(setRestrooms(restrooms.data));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
}

export function* getFeedRestrooms({ payload }) {
  const user = yield select(userSelector);
  if (payload.isInitial) {
    yield put(setFetchingFeedRestrooms());
  } else {
    yield put(setFetchingNewFeedRestrooms());
  }

  try {
    const response = yield call(restroomService.getFeedRestrooms, {
      user,
      offset: payload.offset,
      limit: payload.limit,
      searchValue: payload.searchValue,
      minimalRating: payload.minimalRating
    });
    if (payload.isInitial) {
      yield put(resetFeedRestrooms());
    }
    yield put(addFeedRestrooms(response.data));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  } finally {
    if (payload.isInitial) {
      yield put(setFetchingFeedRestroomsFinished());
    } else {
      yield put(setFetchingNewFeedRestroomsFinished());
    }
  }
}

export function* addRestroom({ payload }) {
  yield put(setAddingRestroom());
  try {
    const user = yield select(userSelector);
    const response = yield call(restroomService.create, {
      user,
      restroom: payload
    });
    yield call(fetchRestrooms);
    yield call(() => getRestroomRatings({ payload: response.data, includeRatings: false }));
    NavigationService.navigate('Home', {
      restroom: response.data,
      from: 'PickRestroomLocation',
      centerLocation: {
        latitude: response.data.latitude,
        longitude: response.data.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.02
      }
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  } finally {
    yield put(setFinishedAddingRestroom());
  }
}

export function* addRestroomComment({ payload }) {
  const user = yield select(userSelector);
  yield put(setAddingComment());

  try {
    yield call(restroomService.addComment, {
      user,
      restroom: payload.restroom,
      content: payload.content
    });
    yield put(resetRestroomComments());
    yield call(() =>
      getRestroomComments({
        payload: {
          restroom: payload.restroom,
          offset: 0,
          limit: FETCHING_LIMIT,
          isInitial: true
        }
      })
    );
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  } finally {
    yield put(setAddingCommentFinished());
  }
}

export function* getRestroomComments({ payload }) {
  const user = yield select(userSelector);
  if (payload.isInitial) {
    yield put(setFetchingComments());
  } else {
    yield put(setFetchingNewComments());
  }

  try {
    const response = yield call(restroomService.getComments, {
      user,
      restroom: payload.restroom,
      offset: payload.offset,
      limit: payload.limit
    });
    if (payload.isInitial) {
      yield put(resetRestroomComments());
    }
    yield put(addRestroomComments(response.data));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  } finally {
    if (payload.isInitial) {
      yield put(setFetchingCommentsFinished());
    } else {
      yield put(setFetchingNewCommentsFinished());
    }
  }
}

export function* addRestroomRating({ payload }) {
  const user = yield select(userSelector);
  yield put(setAddingRating());

  try {
    yield call(restroomService.addRating, {
      user,
      restroom: payload.restroom,
      rating: payload.rating
    });
    yield put(getRestroomRatingsAction(payload.restroom));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  } finally {
    yield put(setAddingRatingFinished());
  }
}

export function* getRestroomRatings({ payload, includeRatings }) {
  const user = yield select(userSelector);
  yield put(setFetchingRatings());

  try {
    const response = yield call(restroomService.getRatings, {
      user,
      restroom: payload,
      includeRatings
    });

    yield put(setRestroomRatings(response.data));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  } finally {
    yield put(setFetchingRatingsFinished());
  }
}
