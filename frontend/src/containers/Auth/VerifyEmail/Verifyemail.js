import React from "react";
import { connect } from "react-redux";
import classes from "./Verifyemail.module.css";
// import classes from "../Auth.module.css";

const VerifyEmail = (props) => {
  return (
    <div className={classes.Verifyemail}>
      <div className={classes.Verify}>
        <h2>Registration Successful</h2>
        <p>
          A link has been sent to your email address , kindly check your mail too
          verify and log in
        </p>
      </div>
    </div>
  );
};


export default (VerifyEmail);
