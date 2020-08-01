import {
  DEFAULT_STATUS,
  LOGIN_USER_FAILED,
  LOGIN_USER_SUCCESS,
  LOGOUT_SUCCESS,
} from '../constants/user';

export const loginUserSuccess = (userData) => (dispatchEvent) => {
  dispatchEvent({
    type: LOGIN_USER_SUCCESS,
    payload: userData,
  });
  setTimeout(() => {
    dispatchEvent({ type: DEFAULT_STATUS });
  }, 3000);
};

export const loginUserFailed = (error) => (dispatchEvent) => {
  dispatchEvent({
    type: LOGIN_USER_FAILED,
    error,
  });
  setTimeout(() => {
    dispatchEvent({ type: DEFAULT_STATUS });
  }, 3000);
};

export const logoutUser = () => (dispatchEvent) => {
  dispatchEvent({
    type: LOGOUT_SUCCESS,
  });
  setTimeout(() => {
    dispatchEvent({ type: DEFAULT_STATUS });
  }, 3000);
};
