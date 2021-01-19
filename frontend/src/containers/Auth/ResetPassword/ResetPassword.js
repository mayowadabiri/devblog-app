import React, { useState } from "react";
import Input from "../../../components/UI/Input/Input";
import classes from "../Auth.module.css";
import { confirmPassword, password } from "../../../helpers/validation";
import axios from "../../../constants/axios-create";
import Modal from "../../../components/Modal/Modal";
import { useRouteMatch } from "react-router";
import Button from "../../../components/UI/Button/Button";

const ResetPassword = (props) => {
  const [resetPasswordForm, setResetPasswordForm] = useState({
    password: {
      elementType: "input",
      label: "Password",
      elementConfig: {
        type: "password",
        placeholder: "Password",
      },
      validators: [password],
      isValid: false,
      value: "",
      touched: false,
      errorMessage: "",
    },
    confirmPassword: {
      elementType: "input",
      label: "Confirm Password",
      elementConfig: {
        type: "password",
        placeholder: "Confirm Your Password",
      },
      validators: [confirmPassword],
      isValid: false,
      value: "",
      touched: false,
      errorMessage: "",
    },
  });
  const { params } = useRouteMatch();

  const [show, setShow] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [formValid, setFormValid] = useState(false);

  const inputChangeHandler = (event, inputIdentifier) => {
    let passwordValue = resetPasswordForm["password"].value;
    let isValid = true;
    let msg = "";
    for (let validation of resetPasswordForm[inputIdentifier].validators) {
      isValid = validation(event.target.value, passwordValue).isTrue && isValid;
      msg = validation(event.target.value).msg;
    }
    const updatedFormElement = {
      ...resetPasswordForm[inputIdentifier],
      value: event.target.value,
      isValid: isValid,
      touched: true,
      errorMessage: msg,
    };
    const updatedResetPasswordForm = {
      ...resetPasswordForm,
      [inputIdentifier]: updatedFormElement,
    };

    let formIsValid = true;
    for (let inputIdentifier in updatedResetPasswordForm) {
      formIsValid =
        updatedResetPasswordForm[inputIdentifier].isValid && formIsValid;
    }
    setResetPasswordForm(updatedResetPasswordForm);
    setFormValid(formIsValid);
  };

  const resetPasswordHandler = (event) => {
    setClicked(true);
    const resetPassword = {};
    for (let key in resetPasswordForm) {
      resetPassword[key] = resetPasswordForm[key].value;
    }
    if (!formValid) {
      event.preventDefault();
    } else {
      setShow(true);
      setMessage("");
      setError("");
      axios
        .post(`/user/resetpassword/${params.token}`, resetPassword)
        .then((result) => {
          setShow(false);
          props.history.push("/login");
        })
        .catch((error) => {
          setError(error.response.data.message);
          setShow(false);
        });
    }
  };

  let formArray = [];
  for (let key in resetPasswordForm) {
    formArray.push({
      id: key,
      config: resetPasswordForm[key],
    });
  }
  let form = formArray.map((form) => (
    <Input
      key={form.id}
      config={form.config.elementConfig}
      onchange={(event) => inputChangeHandler(event, form.id)}
      value={form.config.value}
      elementType={form.config.elementType}
      isValid={form.config.isValid}
      touched={form.config.touched}
      message={form.config.errorMessage}
      formIsValid={formValid}
      clicked={clicked}
      label={form.config.label}
      inputStyle={classes.inputStyle}
    />
  ));

  let spinner = show ? <Modal show={show}>Please wait</Modal> : "";

  return (
    <>
      {spinner}
      <div className={classes.Form}>
        <div className={classes.LoginForm}>
          <h1>Forgot Password</h1>
          {!show && error !== "" ? <p style={{ color: "red" }}>{error}</p> : ""}
          {!show && message !== "" ? (
            <p style={{ color: "#5C9210" }}>{message}</p>
          ) : (
            ""
          )}
          {form}
          <Button
            style={classes.Button}
            btntype="success"
            clicked={resetPasswordHandler}
            disabled={props.disabled}
          >
            Submit
          </Button>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
