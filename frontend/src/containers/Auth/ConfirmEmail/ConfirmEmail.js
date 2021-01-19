import React, { useEffect, useState } from "react";
import { useRouteMatch } from "react-router";
import { Link } from "react-router-dom";
import Modal from "../../../components/Modal/Modal";
import axiosURL from "../../../constants/axios-create";
import classes from "./ConfirmEmail.module.css";
import authClasses from "../Auth.module.css";
import Button from "../../../components/UI/Button/Button";
import { email } from "../../../helpers/validation";
import Input from "../../../components/UI/Input/Input";

const ConfirmEmail = (props) => {
  const [resendLinkForm, setResendLinkForm] = useState({
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
  const { params } = useRouteMatch();
  const [confirmationMsg, setConfirmationMessage] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState(false);
  const [clicked, setClicked] = useState(false);
  useEffect(() => {
    setShow(true);
    axiosURL
      .post(`/user/confirmemail/${params.token}`)
      .then((result) => {
        setShow(false);
        setConfirmationMessage(result.data.message);
      })
      .catch((error) => {
        console.log(error.response);
        setShow(false);
        setError(true);
        setConfirmationMessage(error.response.data.message);
      });
  }, []);

  const inputChangeHandler = (event) => {
    let isValid = true;
    let msg = "";
    isValid = email(event.target.value).isTrue;
    msg = email(event.target.value).msg;
    setResendLinkForm({
      ...resendLinkForm,
      email: {
        ...resendLinkForm.email,
        value: event.target.value,
        isValid: isValid,
        errorMessage: msg,
        touched: false,
      },
      formValid: isValid && true,
    });
  };

  const resendLinkHandler = (event) => {
    setClicked(true);
    const resendLink = {};
    for (let key in resendLinkForm) {
      resendLink[key] = resendLinkForm[key].value;
    }
    if (!resendLinkForm.formValid) {
      event.preventDefault();
    } else {
      setShow(true);
      axiosURL
        .post("/user/resend", resendLink)
        .then((result) => {
          setShow(false)
          console.log(result)
          props.history.push("/verifyemail");
        })
        .catch((error) => {
          setShow(false);
          setError(error.response.data.message);
        });
    }
  };

  let formArray = [];
  for (let key in resendLinkForm) {
    formArray.push({
      id: key,
      config: resendLinkForm[key],
    });
  }
  let form = (
    <Input
      config={resendLinkForm.email.elementConfig}
      onchange={inputChangeHandler}
      value={resendLinkForm.email.value}
      elementType={resendLinkForm.email.elementType}
      isValid={resendLinkForm.email.isValid}
      touched={resendLinkForm.email.touched}
      message={resendLinkForm.email.errorMessage}
      formIsValid={resendLinkForm.formValid}
      clicked={clicked}
      label={resendLinkForm.email.label}
      inputStyle={classes.inputStyle}
    />
  );

  const confirmed = show ? (
    <Modal show={show}>Loading...</Modal>
  ) : (
    <div className={classes.ConfirmEmail}>
      <div>
        {error ? (
          <>
            {form}
            <Button
              clicked={resendLinkHandler}
              style={authClasses.Button}
              btntype="success"
              disabled={props.disabled}
            >
              Resend Link{" "}
            </Button>
          </>
        ) : null}
        <p>{confirmationMsg}</p>
        <Link to="/login">Login</Link>
      </div>
    </div>
  );

  return confirmed;
};

export default ConfirmEmail;
