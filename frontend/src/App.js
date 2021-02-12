// @ts-nocheck
import React, { lazy, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Route, Switch, withRouter } from "react-router-dom";
import "./App.css";
import Logout from "./containers/Auth/Logout/Logout";
import Landingpage from "./containers/Landingpage/Landingpage";
import * as actionCreators from "./store/action/index";
import Layout from "./hoc/Layout/Layout";
import { ProtectedRoute, EmailRoutes } from "./hoc/ProtectedRoute";
import Modal from "./components/Modal/Modal";
import Createblog from "./containers/Createblog/Createblog";
import Connectivity from "./components/Connectivity/Connectivity";

const Blog = lazy(() => {
  return import("./containers/Blog/Blog");
});

const Register = lazy(() => {
  return import("./containers/Auth/Register/Register");
});

const Login = lazy(() => {
  return import("./containers/Auth/Login/Login");
});

const VerifyEmail = lazy(() => {
  return import("./containers/Auth/VerifyEmail/Verifyemail");
});

const Singleblog = lazy(() => {
  return import("./containers/Singleblog/Singleblog");
});

const ForgotPassword = lazy(() => {
  return import("./containers/Auth/ForgotPassword/ForgotPassword");
});

const ResetPassword = lazy(() => {
  return import("./containers/Auth/ResetPassword/ResetPassword");
});

const User = lazy(() => {
  return import("./containers/User/User");
});

const UserDetails = lazy(() => {
  return import("./containers/UserDetails/UserDetails");
});

const ConfirmEmail = lazy(() => {
  return import("./containers/Auth/ConfirmEmail/ConfirmEmail");
});

const NotFound = lazy(() => {
  return import("./containers/NotFound/NotFound");
});

function App(props) {
  const [event, setEvent] = useState({ type: "" });
  const [disabled, setDisabled] = useState(false);

  window.addEventListener("load", (event) => {
    const isOnline = navigator.onLine;
    if (isOnline) {
      setEvent({ type: "online" });
      setDisabled(false);
    } else {
      setEvent({ type: "offline" });
      setDisabled(true);
    }
  });

  useEffect(() => {
    props.onCheckAuth();
  }, []);

  useEffect(() => {
    window.addEventListener("online", (event) => {
      setEvent(event);
      setDisabled(false);
    });
    window.addEventListener("offline", (event) => {
      setEvent(event);
      setDisabled(true);
    });
  }, [event]);

  return (
    <div className="App">
      <React.Suspense fallback={<Modal>Pls wait...</Modal>}>
        <Layout>
          {event.type === "offline" ? (
            <Connectivity />
          ) : event.type === "online" ? null : null}
          <Switch>
            <Route path="/" exact component={Landingpage} />
            <Route
              path="/register"
              render={(props) => <Register disabled={disabled} {...props} />}
            />
            <Route path="/login" render={(props) => <Login disabled={disabled} {...props} />} />
            <Route path="/home" component={Blog} />
            <Route
              path={[
                "/blog/:blogId",
                "/:username/blog/:blogId",
                "/author/:username/blog/:blogId",
              ]}
              render={() => <Singleblog disabled={disabled} />}
            />
            <Route path="/author/:username" component={UserDetails} />
            <EmailRoutes exact path="/verifyemail" component={VerifyEmail} />
            <EmailRoutes path="/confirmemail/:token" component={ConfirmEmail} />
            <EmailRoutes
              path="/forgotpassword"
              disabled={disabled}
              component={ForgotPassword}
            />``
            <EmailRoutes
              path="/resetpassword/:token"
              component={ResetPassword}
              disabled={disabled}
            />
            <ProtectedRoute
              exact
              disabled={disabled}
              path={["/create", "/:username/blog/:blogId/edit-blog"]}
              component={Createblog}
            />
            <ProtectedRoute path="/logout" component={Logout} />
            <ProtectedRoute
              path="/user/:username"
              component={User}
              disabled={disabled}
            />
            <Route path="*" component={NotFound} />
          </Switch>
        </Layout>
      </React.Suspense>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    onCheckAuth: () => {
      dispatch(actionCreators.checkAuth());
    },
  };
};
export default connect(null, mapDispatchToProps)(withRouter(App));
