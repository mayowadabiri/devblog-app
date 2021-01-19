import React, { useState, useEffect } from "react";
import axios from "axios";
import Backdrop from "../../components/UI/Backdrop/Backdrop";
import classes from "./Blogsummary.module.css";
import Button from "../../components/UI/Button/Button";
import Modal from "../../components/Modal/Modal";

const Blogsummary = (props) => {
  // console.log(props.id)
  // const [error, setError] = useState("");
  const [summary, setSummary] = useState({
    Title: "dabiri",
    Author: "",
    Certainity_Percentage: "",
    Sentiment: "",
    Summmary: ""
  });
  const [show, setShow] = useState(false);
  useEffect(() => {
    setShow(true);
    axios
      .post("https://app-sum.herokuapp.com/", {
        url: "https://api-dev-story.herokuapp.com/blog/",
        id: props.id,
      })
      .then((result) => {
        setSummary(result.data);
        setShow(false);
      })
      .catch((error) => {
        setShow(false);
        // setError("Error generating summary, close and try again");
      });
  }, []);
  return (
    <>
      {show ? (
        <Modal show={show}>Generating Summary</Modal>
      ) : (
        <>
          <Backdrop show={props.show} />
          <div className={classes.Blogsummary}>
            <div className={classes.container}>
                <h1>{ summary.Title}</h1>
              <div>
                <p>{summary.Summmary}</p>
              </div>
                <p>Sentiment Analysis: Tthis blog has a { summary.Sentiment}</p>
                <p>It's certainity perecentage is { summary.Certainity_Percentage}%</p>
              <Button
                clicked={props.close}
                btntype={"success"}
                style={classes.Button}
                disabled={props.disabled}
              >
                Close
              </Button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Blogsummary;
