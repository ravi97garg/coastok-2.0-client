import {
  LOADER_ON,
  LOADER_OFF
} from '../constants/loader';
import {CREATE_AREA_FAILED, CREATE_AREA_STARTED, CREATE_AREA_SUCCESS} from "../constants/area";
import {LOGIN_USER_FAILED, LOGIN_USER_STARTED, LOGIN_USER_SUCCESS} from "../constants/user";

const initState = {
  status: LOADER_OFF
};

const loaderReducer = (state = initState, action) => {
  switch (action.type) {
    case CREATE_AREA_STARTED:
    case LOGIN_USER_STARTED:
    case LOADER_ON:
      return {
        ...state,
        status: LOADER_ON,
      };

    case CREATE_AREA_SUCCESS:
    case CREATE_AREA_FAILED:
    case LOGIN_USER_SUCCESS:
    case LOGIN_USER_FAILED:
    case LOADER_OFF:
      return {
        ...state,
        status: LOADER_OFF,
      };

    default:
      return state;
  }
};

export default loaderReducer;
