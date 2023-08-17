import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const AdminRoute = ({ component: Component, auth, user, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      !auth ? (
        <Redirect to="/PageLoginCover" />
      ) : user && !user.isAdmin ? (
        <Redirect to="/" />
      ) : (
        <Component {...props} />
      )
    }
  />
);
const mapStateToProps = (state) => ({
  auth: state.appReducer.isAuthenticated,
  user: state.appReducer.user
});
export default connect(mapStateToProps)(AdminRoute);
