import React from "react";
import PropTypes from 'prop-types';
import GoogleLogin from "react-google-login";
import {GOOGLE_CLIENT_ID} from "../../config/google_auth";
import { connect } from 'react-redux';
import {
  loginUserFailed,
  loginUserSuccess,
  logoutUser,
} from '../../actions/user';
import {ROUTE} from "../../constants";
import {withRouter} from "react-router-dom";
import './styles.scss';

class LoginPage extends React.PureComponent {
  onLoginSuccess = (userData) => {
    const {
      history,
      loginUserSuccess,
    } = this.props;
    console.log(userData);
    loginUserSuccess(userData);
    history.push(ROUTE.DASHBOARD);
  };

  render() {
    return (
      <div className="container-scroller">
        <div className="container-fluid page-body-wrapper full-page-wrapper">
          <div className="content-wrapper d-flex align-items-center auth px-0">
            <div className="row w-100 mx-0">
              <div className="col-lg-4 mx-auto">
                <div className="auth-form-light text-left py-5 px-4 px-sm-5 auth-form">
                  <div className="brand-logo">
                    <img src="../../images/pp.jpeg" alt="logo"/>
                  </div>
                  <h4>COASTOK Admin Panel</h4>
                  <h6 className="font-weight-light">Sign in to continue.</h6>
                  {/*<a className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"*/}
                  {/*   href="../../index.html">SIGN IN</a>*/}
                  <br/>
                  <GoogleLogin
                    clientId={GOOGLE_CLIENT_ID}
                    buttonText="Login"
                    onSuccess={this.onLoginSuccess}
                    onFailure={loginUserFailed}
                    isSignedIn
                    cookiePolicy="single_host_origin"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = (state) => ({
  user: state.userReducer,
});

const mapDispatchToProps = {
  loginUserSuccess,
  loginUserFailed,
  logoutUser,
};

LoginPage.propTypes = {
  history: PropTypes.object.isRequired,
  loginUserFailed: PropTypes.func.isRequired,
  loginUserSuccess: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  user: PropTypes.object,
};

LoginPage.defaultProps = {
  user: null,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginPage));