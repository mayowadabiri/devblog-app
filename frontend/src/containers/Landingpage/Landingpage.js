// @ts-nocheck
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import SplitText from "react-pose-text";
import Button from "../../components/UI/Button/Button";
import classes from "./Landingpage.module.css";

const charPoses = {
  exit: { opacity: 0, y: 20 },
  enter: {
    opacity: 1,
    y: 0,
    delay: ({ charIndex }) => charIndex * 200,
  },
};
const wordPoses = {
  draggable: true,
  dragBounds: { left: "-100%", right: "100%" },
};

const Landingpage = (props) => {
  return (
    <div className={classes.Landingpage}>
      <div className={classes.Landingpage__details}>
        <h2>
          <SplitText
            wordPoses={wordPoses}
            initialPose="exit"
            pose="enter"
            charPoses={charPoses}
          >
            Let the world know your developer's story today
          </SplitText>
        </h2>
        <Link
          to={props.isAuth ? "/home" : "/register"}
          className={classes.Link}
        >
          <Button btntype="success" style={classes.Button}>
            Let's Get Started
          </Button>
        </Link>
      </div>
    </div>

  );
};

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.token !== null,
  };
};
export default connect(mapStateToProps)(Landingpage);
