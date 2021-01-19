import React, { useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";
import SideDrawer from "../../components/Sidedrawer/Sidedrawer";
import Toolbar from "../../components/Toolbar/Toolbar";
import classes from "./Layout.module.css";
import load from "../../constants/image-loader";

const layout = (props) => {
  const [show, setShow] = useState(false);
  const [showSideDrawer, setShowSideDrawer] = useState(false);

  useEffect(() => {
    setShow(false);
    return () => {
      setShow(false);
    };
  }, []);

  const dropDownToggle = () => {
    setShow(!show);
  };

  const sideDrawerCloseHandler = () => {
    setShowSideDrawer(false);
  };

  const toggleDrawerHandler = () => {
    setShowSideDrawer(!showSideDrawer);
  };

  const username = localStorage.getItem("username");
  const token = localStorage.getItem("token");
  const image = localStorage.getItem("image");
  const imageU = image && image !== "" ? image : image === "" ? "" : image;
  const imageURL = imageU === "" ? "" : `${load}${imageU}`;
  return (
    <div className={classes.Layout}>
      {useMemo(
        () => (
          <Toolbar
            clicked={() => setShow(false)}
            toggle={dropDownToggle}
            image={imageURL}
            userId={username}
            isAuth={token ? true : false}
            showDropdown={show}
            toggleSidebar={toggleDrawerHandler}
          />
        ),
        [token, imageURL, show]
      )}
      <SideDrawer
        isAuthenticated={token ? true : false}
        closed={sideDrawerCloseHandler}
        open={showSideDrawer}
      />
      <div onClick={() => setShow(false)} className={classes.Content}>
        {props.children}
      </div>
      {/* <Footer /> */}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
    image: state.user.user.image,
  };
};

export default connect(mapStateToProps)(layout);
