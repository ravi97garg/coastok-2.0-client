import {
  DEFAULT_STATUS,
  CREATE_AREA_FAILED,
  CREATE_AREA_STARTED,
  CREATE_AREA_SUCCESS,
} from '../constants/area';
import { ACTION_STATUS } from '../constants';

const initState = {
  status: ACTION_STATUS.DEFAULT,
  data: [],
  error: null,
};

const areaReducer = (state = initState, action) => {
  switch (action.type) {
    case CREATE_AREA_STARTED:
      return {
        ...state,
        status: ACTION_STATUS.PENDING,
      };

    case CREATE_AREA_SUCCESS:
      state.data.push(action.payload)
      return {
        ...state,
        status: ACTION_STATUS.SUCCESS,
        data: state.data,
      };

    case CREATE_AREA_FAILED:
      return {
        ...state,
        status: ACTION_STATUS.FAILED,
        error: action.error,
      };

    case DEFAULT_STATUS:
      return {
        ...state,
        status: ACTION_STATUS.DEFAULT,
      };

    default:
      return state;
  }
};

export default areaReducer;
