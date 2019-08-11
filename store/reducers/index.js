import { combineReducers } from 'redux';

import userReducer from './UserReducer';
import loaderReducer from './LoaderReducer';
import errorReducer from './ErrorReducer';
import restroomReducer from './RestroomReducer';

export default combineReducers({
  userReducer,
  loaderReducer,
  errorReducer,
  restroomReducer
});
