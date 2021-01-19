import Dropdown from "../Dropdown/Dropdown";
import React from "react";
import Logo from "../UI/Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import classes from "./Toolbar.module.css";
import DrawerToggle from "../Sidedrawer/Drawertoggle/Drawertoggle";

const Toolbar = (props) => {
  return (
    <header className={classes.Toolbar}>
      <div className={classes.DeskTopOnly}>
        <Logo />
      </div>
        <DrawerToggle
          toggle={props.toggleSidebar}
          image={props.image}
          id={props.userId}
          toggleSide={props.toggle}
          show={props.showDropdown}
          isAuth={props.isAuth}
        />
      <nav className={[classes.NavItems, classes.DeskTopOnly].join(" ")}>
        <NavigationItems isAuth={props.isAuth} onclick={props.clicked} />
        {props.isAuth && (
          <Dropdown
            image={props.image}
            id={props.userId}
            toggle={props.toggle}
            show={props.showDropdown}
          />
        )}
      </nav>
    </header>
  );
};

export default Toolbar;
