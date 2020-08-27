import axiosInstance from "../config/axios";
import {loginUserFailed, loginUserStarted, loginUserSuccess} from "../actions/user";

export const loginAdmin = (loginData, resolve = () => {}, reject = () => {}) => (dispatch) => {
  dispatch(loginUserStarted());
  axiosInstance.post('/users/admin-login', loginData, {
    headers: {
      'Authorization': 'Basic Y29hc3Rvazpjb2FzdG9r'
    }
  }).then((response) => {
    dispatch(loginUserSuccess(response.data.result.data));
    localStorage.setItem('ADMIN_AUTH_KEY', response.data.result.token);
    resolve(response.data);
  })
    .catch((err) => {
      dispatch(loginUserFailed(err));
      reject(err);
    });
}
