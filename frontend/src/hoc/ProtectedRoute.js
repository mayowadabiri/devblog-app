import React from "react";
import { Redirect, Route } from "react-router-dom";

export const ProtectedRoute = ({
  component: Component,
  exact,
  disabled,
  ...rest
}) => {
  const isAuth = localStorage.getItem("token");
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuth ? (
          <Component {...props} exact disabled={disabled} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
};

export const EmailRoutes = ({
  component: Component,
  exact,
  disabled,
  ...rest
}) => {
  const isAuth = localStorage.getItem("token");
  return (
    <Route
      {...rest}
      render={(props) =>
        !isAuth ? (
          <Component {...props} disabled={disabled} exact />
        ) : (
          <Redirect
            to={{ pathname: "/home", state: { from: props.location } }}
          />
        )
      }
    />
  );
};

// export default ProtectedRoute;
