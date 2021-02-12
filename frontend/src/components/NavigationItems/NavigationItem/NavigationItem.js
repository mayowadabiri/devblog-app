// @ts-nocheck

import React from "react";
import classes from "./NavigationItem.module.css";
import { NavLink } from "react-router-dom";

const NavigationItem = (props) => {
  return (
    <>
      <li className={classes.NavigationItem}>
        <NavLink
          to={props.link}
          activeStyle={{
            fontWeight: "bold",
            color: "#addf40",
          }}
          className={classes.LinkItems}
          exact={props.exact}
        >{props.children}</NavLink>
      </li>
    </>
  );
};

export default NavigationItem;
