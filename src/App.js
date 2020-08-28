import React from 'react';
import HeaderComponent from "./components/HeaderComponent";
import HomePage from "./pages/HomePage";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import {ROUTE} from "./constants";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import {connect} from "react-redux";
import CreateArea from "./pages/AreaPage/createArea";
import UpdateArea from "./pages/AreaPage/updateArea";
import {LOADER_ON} from "./constants/loader";
import './App.css';
import {validateToken} from "./services/user";

class App extends React.PureComponent {
  componentDidMount() {
    const token = localStorage.getItem('ADMIN_AUTH_KEY');
    if (token) {
      this.props.validateToken(token);
    }
  }

  render() {
    const {
      user,
      loader,
    } = this.props;
    return (
      <div className="app-container">
        <div className="container-scroller">
          <BrowserRouter>
            <Switch>
              <PrivateRoute
                exact
                path={ROUTE.DASHBOARD}
                component={HomePage}
                user={user && user.data}
              />
              <PrivateRoute
                exact
                path={ROUTE.CREATE_AREA}
                component={CreateArea}
                user={user && user.data}
              />
              <PrivateRoute
                exact
                path={ROUTE.UPDATE_AREA}
                component={UpdateArea}
                user={user && user.data}
              />
              <Route
                exact
                path={ROUTE.LOGIN}
                component={LoginPage}
              />
              <Route
                component={NotFoundPage}
              />
            </Switch>
          </BrowserRouter>
          {/*page-body-wrapper ends*/}
        </div>
        {this.props.loader.status === LOADER_ON && (
          <div className="loader">
            Loading...
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.userReducer,
  loader: state.loaderReducer,
});

const mapDispatchToProps = {
  validateToken,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

const PrivateRoute = ({component: Component, path, user, ...rest}) => {
  if (user && user.userRole === 6) {
    // TODO:Instead of this condition we have to use isLoggedIn util which checks whether token exists, then verify it from backend and save verified userData in redux
    return (
      <Route {...rest} path={path} render={(props) => (
        <div>
          <HeaderComponent user={user}/>
          <Component {...props}/>
        </div>)}/>
    )
  }
  return (
    <Route
      {...rest}
      path={path}
      render={(props) => <Redirect {...props} to={'/login'}/>
      }
    />
  )
}