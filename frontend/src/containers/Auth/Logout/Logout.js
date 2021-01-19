import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import * as actionCreators from "../../../store/action/index";

const logout = (props) => {
  useEffect(() => {
    props.onLogout();
  }, []);

  return <Redirect to="/" />;
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onLogout: () => {
      dispatch(actionCreators.logout());
    },
  };
};
export default connect(null, mapDispatchToProps)(logout);
