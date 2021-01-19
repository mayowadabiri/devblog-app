import React from "react";
import NavigationItem from "./NavigationItem/NavigationItem";
import classes from "./NavigationItems.module.css";

const NavigationItems = (props) => {
  return (
    <>
      <ul className={classes.NavigationItems} onClick={props.onclick}>
        <NavigationItem link="/home" exact>
          Posts
        </NavigationItem>
        {props.isAuth ? (
          <>
            <NavigationItem link="/create">Create Post</NavigationItem>
          </>
        ) : (
          <>
            <NavigationItem link="/register">Register</NavigationItem>
            <NavigationItem link="/login">Login</NavigationItem>
          </>
        )}
      </ul>
    </>
  );
};

export default NavigationItems;
