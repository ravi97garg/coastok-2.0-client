import React from 'react';
import HeaderComponent from "./components/HeaderComponent";
import HomePage from "./pages/HomePage";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import {ROUTE} from "./constants";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import {connect} from "react-redux";
import CreateArea from "./pages/Area/createArea";
import UpdateArea from "./pages/Area/updateArea";

class App extends React.PureComponent {
  render() {
    const {
      user,
    } = this.props;
    return (
      <div>
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
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.userReducer,
});

export default connect(mapStateToProps, null)(App);

const PrivateRoute = ({component: Component, path, user, ...rest}) => {
  if (user) {
    return (
      <Route {...rest} path={path} render={(props) => (
        <div className="container-scroller">
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