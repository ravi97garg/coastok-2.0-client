import { combineReducers } from 'redux';
import userReducer from './user';
import areaReducer from "./area";

const rootReducer = combineReducers({
  userReducer,
  areaReducer,
});

export default rootReducer;
