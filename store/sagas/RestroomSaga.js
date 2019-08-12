import { call, put, select } from 'redux-saga/effects';
import { restroomService } from '../../services/RestroomService';
import { userSelector } from '../selectors/UserSelector';
import { setRestrooms } from '../actions/RestroomActions';

export function* fetchRestrooms() {
  try {
    const user = yield select(userSelector);
    const restrooms = yield call(restroomService.fetchAll, user);
    yield put(setRestrooms(restrooms.data));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
}

export function* addRestroom({ payload }) {
  try {
    const user = yield select(userSelector);
    yield call(restroomService.create, {
      user,
      restroom: payload
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
}
