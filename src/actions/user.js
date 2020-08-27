import {
  LOGIN_USER_STARTED,
  LOGIN_USER_FAILED,
  LOGIN_USER_SUCCESS,
  LOGOUT_SUCCESS, LOGOUT_STARTED, LOGOUT_FAILED,
} from '../constants/user';

export const loginUserStarted = () => ({
  type: LOGIN_USER_STARTED,
});

export const loginUserSuccess = (userData) => ({
  type: LOGIN_USER_SUCCESS,
  payload: userData,
});

export const loginUserFailed = (error) => ({
  type: LOGIN_USER_FAILED,
  error,
});

export const logoutUserStarted = () => ({
  type: LOGOUT_STARTED,
});

export const logoutUserSuccess = () => ({
  type: LOGOUT_SUCCESS,
});

export const logoutUserFailed = () => ({
  type: LOGOUT_FAILED,
});