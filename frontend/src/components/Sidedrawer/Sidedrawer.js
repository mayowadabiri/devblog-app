import React from "react";

import classes from "./Sidedrawer.module.css";
import Backdrop from "../UI/Backdrop/Backdrop";
import NavigationItems from "../NavigationItems/NavigationItems";
import Logo from "../UI/Logo/Logo";

const SideDrawer = (props) => {
  let attachedClasses = [classes.Sidedrawer, classes.Close];

  if (props.open) {
    attachedClasses = [classes.Sidedrawer, classes.Open];
  }
  return (
    <>
      <Backdrop show={props.open} clicked={props.closed} />
      <div className={attachedClasses.join(" ")} onClick={props.closed}>
        <Logo />
        <nav className={classes.NavItem}>
          <NavigationItems isAuth={props.isAuthenticated} />
        </nav>
      </div>
    </>
  );
};
export default SideDrawer;
