import { combineReducers } from 'redux';
import userReducer from './user';
import areaReducer from "./area";
import loaderReducer from "./loader";

const rootReducer = combineReducers({
  userReducer,
  areaReducer,
  loaderReducer,
});

export default rootReducer;
