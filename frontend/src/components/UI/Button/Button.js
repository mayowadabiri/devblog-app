// @ts-nocheck
import React from "react";
import classes from "./Button.module.css";

const Button = (props) => {
  // console.log(props)
  return (
    <button
      type="submit"
      disabled = {props.disabled}
      onClick={props.clicked}
      className={[
        classes.Button,
        props.btntype === "success" ? classes.Success : props.btntype === "danger" ? classes.Danger : "", props.style
      ].join(" ")}
    >
      {props.children}
    </button>
  );
};

export default Button;
