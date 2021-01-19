import React from "react";
import Loader from "../../hoc/Loader/Loader";
import classes from "./Modal.module.css";
import posed from "react-pose";
import Backdrop from "../UI/Backdrop/Backdrop";

const ModalPose = posed.div({
  enter: {
    y: 0,
    opacity: 1,
    delay: 300,
    transition: {
      y: { type: "spring", stiffness: 1000, damping: 15 },
      default: { duration: 500 },
    },
  },
  exit: {
    y: 50,
    opacity: 0,
    transition: { duration: 150 },
  },
});

const Modal = (props) => {
    return (
    <>
      <Backdrop show={props.show} clicked={props.modalClosed} />
      <ModalPose
        key="Modal"
        className={classes.Modal}
        style={{
          transform: props.show ? "translateX(0)" : "translateY(-100vh)",
          opacity: props.show ? 1 : 0,
        }}
      >
        <Loader>{props.children}</Loader>
      </ModalPose>
    </>
  );
};

export default React.memo(
  Modal,
  (prevProps, nextProps) => nextProps.show === prevProps.show
);
