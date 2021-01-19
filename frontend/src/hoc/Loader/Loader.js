import React from "react";
import classes from "./Loader.module.css";

const Loader = (props) => (
  <>
   <div className={[classes.loader, props.style].join(" ")}>Loading...</div>
    <p style={{
        color: "#addf40",
        fontSize: "20px",
        textAlign: "center"
    }}>{props.children}</p>
  </>
);
export default Loader;
