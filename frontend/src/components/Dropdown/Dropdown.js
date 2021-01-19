import React from "react";
import { Link, withRouter } from "react-router-dom";
// import NavigationItem from "../NavigationItems/NavigationItem/NavigationItem";
import classes from "./Dropdown.module.css"

const Dropdown = (props) => {
  const inputClasses = [classes.DropDownItems]
  props.show ? inputClasses.push(classes.Show) : inputClasses.push(classes.Close)
  return (
    <div className={classes.Dropdown}>
          <div className={classes.Header} onClick={props.toggle}>
            {props.image === "" ? null :<img src={props.image} alt={"user"} />}
          </div>
      <div className={inputClasses.join(" ")}>
        <ul className={classes.DropDownItem}>
          <Link className={classes.DropdownLink} to={`/user/${props.id}`}>My Profile</Link>
          <Link className={classes.DropdownLink} to="/logout">Logout</Link>
        </ul>
      </div>
    </div>
  );
};

export default withRouter(Dropdown);
