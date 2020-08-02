import React from "react";
import {Link} from "react-router-dom";
import {ROUTE} from "../../constants";
import './style.scss';

class NotFoundPage extends React.PureComponent {
  render() {
    return (
      <div className="not-found-page">
        <div className="title">This page is not found</div>
        <Link to={ROUTE.DASHBOARD} className="btn btn-inverse-primary btn-fw">Go Back</Link>
      </div>
    )
  }
}

export default NotFoundPage;