import React from "react";
import {Link} from "react-router-dom";
import {ROUTE} from "../../constants";

class NotFoundPage extends React.PureComponent {
  render() {
    return (
      <div>
        This page is not found
        <Link to={ROUTE.DASHBOARD}>Go Back</Link>
      </div>
    )
  }
}

export default NotFoundPage;