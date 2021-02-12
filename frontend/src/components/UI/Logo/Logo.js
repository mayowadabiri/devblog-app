// @ts-nocheck
import React from "react";
import {NavLink} from "react-router-dom"
import classes from "./Logo.module.css";



const Logo = () => {
  return (
    <div className={classes.Logo}>
     <NavLink to="/" className={classes.Link}>
       {"<DevStory />"}
     </NavLink>
    </div>
  );
};

export default Logo;
