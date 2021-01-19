import React from "react";
import { Link } from "react-router-dom";
import classes from "./Link.module.css";

const LinkButton = (props) => {
  return (
    <Link
      className={[
        classes.LinkItem,
        props.styleType === "success"
          ? classes.Success
          : props.styleType === "danger"
          ? classes.Danger
          : "",
        props.linkStyle,
      ].join(" ")}
      to={props.link}
      onClick={props.clicked}
    >
      {props.children}
    </Link>
  );
};

export default LinkButton;
