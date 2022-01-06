import React from "react";
import { Route, Redirect } from "react-router-dom";
import jwtDecode from "jwt-decode";

const PrivateRoute = ({ component: Component, type, ...rest }) => {
  const jwt = localStorage.getItem("pms-token");
  let userType;
  if (jwt) {
    const token = jwtDecode(jwt);
    userType = token.type;
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        userType === type ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};

export default PrivateRoute;
