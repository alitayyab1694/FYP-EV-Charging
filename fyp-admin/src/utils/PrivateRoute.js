import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const PrivateRoute = ({ component: Component, auth, user, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      // <Component {...props} />
      !auth ? <Redirect to="/Login" /> : <Component {...props} />
    }
  />
);
const mapStateToProps = (state) => ({
  auth: state.user.isAuth,
});
export default connect(mapStateToProps)(PrivateRoute);
