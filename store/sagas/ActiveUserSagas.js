import { call, put, select } from 'redux-saga/effects';
import { setLoader } from '../actions/LoaderAction';
import authService from '../../services/AuthService';
import NavigationService from '../../services/NavigationService';
import {
  setSignInError,
  setGlobalError,
  setSignUpErrors,
  changePasswordError,
  setForgotPasswordError,
  setResetPasswordError,
  setSocialLoginError
} from '../actions/ErrorActions';
import {
  setUser,
  setChangePasswordSuccess,
  setUpdatedUser,
  setFetchingMyComments,
  setFetchingMyNewComments,
  setFetchingMyCommentsFinished,
  setFetchingMyNewCommentsFinished,
  resetMyComments,
  addMyComments
} from '../actions/UserActions';
import { profileService } from '../../services/ProfileService';
import { resetFeedRestrooms, resetMyFeedRestrooms } from '../actions/RestroomActions';
import { userSelector } from '../selectors/UserSelector';
import { userService } from '../../services/UserService';

export function* userLogin({ payload }) {
  try {
    yield put(setSignInError(false));
    yield put(setLoader(true));
    yield call(authService.login, payload);
    NavigationService.navigate('AuthLoading');
  } catch (error) {
    if (error.response.status === 401) {
      yield put(setSignInError(true));
    } else {
      yield put(setGlobalError(true));
    }
  } finally {
    yield put(setLoader(false));
  }
}

export function* userFacebookLogin() {
  try {
    yield put(setLoader(true));
    yield call(authService.loginWithFacebook);
    NavigationService.navigate('AuthLoading');
  } catch (error) {
    if (error.message !== 'cancel') {
      if (error.response.status === 422) {
        yield put(setSocialLoginError(error.response.data.error));
      } else {
        yield put(setGlobalError(true));
      }
    }
  } finally {
    yield put(setLoader(false));
  }
}

export function* userGoogleLogin() {
  try {
    yield put(setLoader(true));
    yield call(authService.loginWithGoogle);
    NavigationService.navigate('AuthLoading');
  } catch (error) {
    if (error.message !== 'cancel') {
      if (error.response.status === 422) {
        yield put(setSocialLoginError(error.response.data.error));
      } else {
        yield put(setGlobalError(true));
      }
    }
  } finally {
    yield put(setLoader(false));
  }
}

export function* userSignUp({ payload }) {
  try {
    yield put(setSignUpErrors({}));
    yield put(setLoader(true));
    yield call(authService.signup, payload);
    NavigationService.navigate('AuthLoading');
  } catch (error) {
    if (error.response.status === 422) {
      yield put(setSignUpErrors(error.response.data.errors));
    } else {
      yield put(setGlobalError(true));
    }
  } finally {
    yield put(setLoader(false));
  }
}

export function* userLogout() {
  try {
    yield put(setLoader(true));
    yield put(resetFeedRestrooms());
    yield put(resetMyFeedRestrooms());
    yield call(authService.logout);
    NavigationService.navigate('AuthLoading');
  } catch (error) {
    console.log(error); /*eslint-disable-line*/
  } finally {
    yield put(setLoader(false));
  }
}

export function* forgotPassword({ payload }) {
  try {
    yield put(setForgotPasswordError(false));
    yield put(setLoader(true));
    yield call(authService.forgotPassword, payload);
    NavigationService.navigate('ForgotPasswordSuccess');
  } catch (error) {
    if (error.response.status === 422) {
      yield put(setForgotPasswordError(true));
    } else {
      yield put(setGlobalError(true));
    }
  } finally {
    yield put(setLoader(false));
  }
}

export function* resetPassword({ payload }) {
  try {
    yield put(setLoader(true));
    yield call(authService.resetPassword, payload);
    NavigationService.navigate('ResetPasswordSuccess');
  } catch (error) {
    if (error.response.status === 422) {
      yield put(setResetPasswordError(true));
    } else {
      yield put(setGlobalError(true));
    }
  } finally {
    yield put(setLoader(false));
  }
}

export function* userGet() {
  try {
    yield put(setLoader(true));
    const { data } = yield call(profileService.getProfile);
    yield put(setUser(data));
  } catch (error) {
    yield put(setGlobalError(true));
  } finally {
    yield put(setLoader(false));
  }
}

export function* passwordChange({ payload }) {
  try {
    yield put(setLoader(true));
    yield call(profileService.changePassword, payload);
    yield put(setChangePasswordSuccess(true));
    NavigationService.goBack();
  } catch (error) {
    if (error.response.status === 422) {
      yield put(changePasswordError(true));
    } else {
      yield put(setGlobalError(true));
    }
  } finally {
    yield put(setLoader(false));
  }
}

export function* updateUser({ payload }) {
  try {
    yield put(setLoader(true));
    const { data } = yield call(profileService.updateUser, payload);
    yield put(setUpdatedUser(data));
    NavigationService.goBack();
  } catch (error) {
    yield put(setGlobalError(true));
  } finally {
    yield put(setLoader(false));
  }
}

export function* getMyComments({ payload }) {
  const user = yield select(userSelector);
  if (payload.isInitial) {
    yield put(setFetchingMyComments());
  } else {
    yield put(setFetchingMyNewComments());
  }

  try {
    const response = yield call(userService.getComments, {
      user,
      offset: payload.offset,
      limit: payload.limit
    });
    if (payload.isInitial) {
      yield put(resetMyComments());
    }
    yield put(addMyComments(response.data));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  } finally {
    if (payload.isInitial) {
      yield put(setFetchingMyCommentsFinished());
    } else {
      yield put(setFetchingMyNewCommentsFinished());
    }
  }
}
