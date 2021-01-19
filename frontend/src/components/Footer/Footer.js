import React from "react";
import Logo from "../Logo/Logo";
import classes from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={classes.Container}>
      <div className={classes.Footer}>
        <Logo />
        <div>
          <ul>
            <li>
              <a href="/">Facebook</a>
            </li>
            <li>
              <a href="/">Twitter</a>
            </li>
            <li>
              <a href="/linkedin">LinkedIn</a>
            </li>
          </ul>
        </div>
      </div>
      <div className={classes.Dabiri}>
        <span>made with love: dabiri mayowa </span>
      </div>
    </footer>
  );
};

export default Footer;
