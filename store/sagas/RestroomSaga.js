import { call, select } from 'redux-saga/effects';
import { restroomService } from '../../services/RestroomService';
import { userSelector } from '../selectors/UserSelector';

export function* addRestroom({ payload }) {
  try {
    const user = yield select(userSelector);
    yield call(restroomService.createRestroom, {
      user,
      restroom: payload
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
}
