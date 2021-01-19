import React from "react";
import Dropdown from "../../Dropdown/Dropdown";
import classes from "./Drawertoggle.module.css";

const DrawerToggle = (props) => {
  return (
    <div className={classes.Drawer}>
      <div className={classes.DrawerToggle} onClick={props.toggle}>
        <div></div>
        <div></div>
        <div></div>
      </div>
     
      {props.isAuth && (
          <Dropdown
            image={props.image}
            id={props.id}
            toggle={props.toggleSide}
            show={props.show}
          />
        )}
    </div>
  );
};

export default DrawerToggle;
