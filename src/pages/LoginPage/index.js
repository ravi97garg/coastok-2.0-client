import React from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {ROUTE} from "../../constants";
import {withRouter} from "react-router-dom";
import './styles.scss';
import {loginAdmin} from "../../services/user";

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  onLoginSuccess = (userData) => {
    const {
      history,
      loginUserSuccess,
    } = this.props;
    loginUserSuccess(userData);
    history.push(ROUTE.DASHBOARD);
  };

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  componentDidMount() {
    const {
      user
    } = this.props;
    if (user && user.data) {
      this.props.history.push(ROUTE.DASHBOARD);
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const {
      user
    } = this.props;
    if (user && user.data) {
      this.props.history.push(ROUTE.DASHBOARD);
    }
  }

  submitDetails = () => {
    const {
      loginAdmin,
      history,
    } = this.props;
    loginAdmin(this.state, (userData) => {
      if(userData.result.data.userRole === 6)
      history.push(ROUTE.DASHBOARD);
    });
  }

  render() {
    return (
      <div className="container-scroller">
        <div className="container-fluid page-body-wrapper full-page-wrapper">
          <div className="content-wrapper d-flex align-items-center auth px-0">
            <div className="row w-100 mx-0">
              <div className="col-lg-4 mx-auto">
                <div className="auth-form-light text-left py-5 px-4 px-sm-5 auth-form">
                  <div className="brand-logo">
                    <img src="../images/pp.jpeg" alt="logo"/>
                  </div>
                  <h4>COASTOK Admin Panel</h4>
                  <h6 className="font-weight-light">Sign in to continue.</h6>
                  {/*<a className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"*/}
                  {/*   href="../../index.html">SIGN IN</a>*/}
                  <br/>
                  {/*<GoogleLogin*/}
                  {/*  clientId={GOOGLE_CLIENT_ID}*/}
                  {/*  buttonText="Login"*/}
                  {/*  onSuccess={this.onLoginSuccess}*/}
                  {/*  onFailure={this.props.loginUserFailed}*/}
                  {/*  onRequest={() => {*/}
                  {/*    this.props.loginUserStarted();*/}
                  {/*  }}*/}
                  {/*  isSignedIn*/}
                  {/*  cookiePolicy="single_host_origin"*/}
                  {/*/>*/}
                  <div className="form-group">
                    <input
                      type="email"
                      className="form-control form-control-lg"
                      // id="exampleInputEmail1"
                      name={'email'}
                      value={this.state.email}
                      onChange={this.handleInputChange}
                      placeholder="Username"/>
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      className="form-control form-control-lg"
                      name={'password'}
                      value={this.state.password}
                      onChange={this.handleInputChange}
                      // id="exampleInputPassword1"
                      placeholder="Password"/>
                  </div>
                  <div className="mt-3">
                    <button
                      className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                      onClick={this.submitDetails}
                       >SIGN IN</button>
                  </div>
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
  loginAdmin,
};

LoginPage.propTypes = {
  history: PropTypes.object.isRequired,
  user: PropTypes.object,
};

LoginPage.defaultProps = {
  user: null,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginPage));