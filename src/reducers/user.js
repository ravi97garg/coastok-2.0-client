import {
  DEFAULT_STATUS,
  LOGIN_USER_FAILED,
  LOGIN_USER_STARTED,
  LOGIN_USER_SUCCESS, LOGOUT_SUCCESS,
} from '../constants/user';
import { ACTION_STATUS } from '../constants';

const initState = {
  status: ACTION_STATUS.DEFAULT,
  data: null,
  error: null,
};

const userReducer = (state = initState, action) => {
  switch (action.type) {
    case LOGIN_USER_STARTED:
      return {
        ...state,
        status: ACTION_STATUS.PENDING,
      };

    case LOGIN_USER_SUCCESS:
      return {
        status: ACTION_STATUS.SUCCESS,
        data: action.payload,
      };

    case LOGIN_USER_FAILED:
      return {
        status: ACTION_STATUS.FAILED,
        error: action.error,
      };

    case LOGOUT_SUCCESS:
      return {
        ...initState,
        status: LOGOUT_SUCCESS,
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

export default userReducer;
