import React from "react";
import { Link } from "react-router-dom";
import classes from "./NotFound.module.css";

const NotFound = () => {
  return (
    <div className={classes.NotFound}>
      <div>
        <h1>Page not found</h1>
        <p>
          {" "}
          You might want to check out for some interesting stories{" "}
          <Link className={classes.NotFoundLink} to="/home"> here</Link>
        </p>
      </div>
    </div>
  );
};

export default NotFound;
