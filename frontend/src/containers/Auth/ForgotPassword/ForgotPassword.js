import React, { useState } from "react";
import classes from "../Auth.module.css"
import { email } from "../../../helpers/validation";
import LinkButton from "../../../components/UI/Link/Link";
import axios from "../../../constants/axios-create";
import Modal from "../../../components/Modal/Modal";
import Button from "../../../components/UI/Button/Button";
import Input from "../../../components/UI/Input/Input";

const ForgotPassword = (props) => {
  const [forgotPasswordForm, setforgotPasswordForm] = useState({
    email: {
      elementType: "input",
      label: "E-mail",
      elementConfig: {
        type: "email",
        placeholder: "Email",
      },
      value: "",
      isValid: false,
      touched: false,
      errorMessage: "",
    },
    formValid: false,
  });

  const [show, setShow] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const inputChangeHandler = (event) => {
    let isValid = true;
    let msg = "";
    isValid = email(event.target.value).isTrue;
    msg = email(event.target.value).msg;
    setforgotPasswordForm({
      ...forgotPasswordForm,
      email: {
        ...forgotPasswordForm.email,
        value: event.target.value,
        isValid: isValid,
        errorMessage: msg,
        touched: false,
      },
      formValid: isValid && true,
    });
  };

  const forgotPasswordHandler = (event) => {
    setClicked(true);
    const forgotpassword = {};
    for (let key in forgotPasswordForm) {
      forgotpassword[key] = forgotPasswordForm[key].value;
    }
    if (!forgotPasswordForm.formValid) {
      event.preventDefault();
    } else {
      setShow(true);
      setMessage("")
      setError("")
      axios
        .post("/user/forgotpassword", forgotpassword)
        .then((result) => {
          setShow(false);
          setMessage(
            `An email has been sent to ${forgotPasswordForm.email.value}, kindly check your inbox or spam folder`
          );
        })
        .catch((error) => {
          setShow(false);
          setError(error.response.data.message);
        });
    }
  };

  let formArray = [];
  for (let key in forgotPasswordForm) {
    formArray.push({
      id: key,
      config: forgotPasswordForm[key],
    });
  }
  let form = (
    <Input
      config={forgotPasswordForm.email.elementConfig}
      onchange={inputChangeHandler}
      value={forgotPasswordForm.email.value}
      elementType={forgotPasswordForm.email.elementType}
      isValid={forgotPasswordForm.email.isValid}
      touched={forgotPasswordForm.email.touched}
      message={forgotPasswordForm.email.errorMessage}
      formIsValid={forgotPasswordForm.formValid}
      clicked={clicked}
      label={forgotPasswordForm.email.label}
      inputStyle={classes.inputStyle}
    />
  );

  let spinner = show ? <Modal show={show}>Please wait</Modal> : "";

  return (
    <>
      {spinner}
      <div className={classes.Form}>
        <div className={classes.LoginForm}>
          <h1>Forgot Password?</h1>
          {!show && error !== "" ? <p style={{color: "red"}}>{error}</p> : ""}
          {!show && message !== "" ? (
            <p style={{ color: "#5C9210" }}>{message}</p>
          ) : (
            ""
          )}
          {form}
          <Button
            style={classes.Button}
            btntype="success"
            clicked={forgotPasswordHandler}
            disabled ={props.disabled}
          >
            Submit
          </Button>
          <div>
            <LinkButton styleType="success" link="/login">
              Login
            </LinkButton>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
