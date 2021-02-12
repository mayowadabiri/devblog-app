// @ts-nocheck
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Button from "../../../components/UI/Button/Button";
import Input from "../../../components/UI/Input/Input";
import classes from "./Register.module.css";
import {
  email,
  password,
  required,
  confirmPassword,
  fullname,
  username,
  URLChecker,
} from "../../../helpers/validation";

import * as actionCreators from "../../../store/action/index";
import Modal from "../../../components/Modal/Modal";
import LinkButton from "../../../components/UI/Link/Link";

const Register = (props) => {
  const [registerForm, setRegisterForm] = useState({
    fullName: {
      elementType: "input",
      label: "Full Name",
      elementConfig: {
        type: "text",
        placeholder: "Full Name",
      },
      validators: [fullname],
      isValid: false,
      touched: false,
      value: "",
      errorMessage: "",
    },
    username: {
      elementType: "input",
      label: "Username",
      elementConfig: {
        type: "text",
        placeholder: "Username",
      },
      validators: [required, username],
      isValid: false,
      touched: false,
      value: "",
      errorMessage: "",
    },
    email: {
      elementType: "input",
      label: "E-mail",
      elementConfig: {
        type: "email",
        placeholder: "Email",
      },
      validators: [email],
      value: "",
      isValid: false,
      touched: false,
      errorMessage: "",
    },
    twitter: {
      elementType: "input",
      label: "Twitter Handle",
      elementConfig: {
        type: "url",
        placeholder: "Your twitter handle",
      },
      validators: [URLChecker],
      isValid: true,
      value: "",
      touched: false,
      errorMessage: "",
    },
    github: {
      elementType: "input",
      label: "Github",
      elementConfig: {
        type: "url",
        placeholder: "Github Link",
      },
      validators: [URLChecker],
      isValid: true,
      value: "",
      touched: false,
      errorMessage: "",
    },
    linkedIn: {
      elementType: "input",
      label: "LinkedIn",
      elementConfig: {
        type: "url",
        placeholder: "LinkedIn Link",
      },
      validators: [URLChecker],
      isValid: true,
      value: "",
      touched: false,
      errorMessage: "",
    },
    gender: {
      elementType: "select",
      label: "Gender",
      elementConfig: {
        options: [
          { value: "Male", displayValue: "Male" },
          { value: "Female", displayValue: "Female" },
          { value: "", displayValue: "Prefer not to say" },
        ],
      },
      validators: [required],
      value: "",
      isValid: true,
    },
    password: {
      elementType: "input",
      label: "Password",
      elementConfig: {
        type: "password",
        placeholder: "Password",
      },
      validators: [required, password],
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

  const [show, setShow] = useState(false);
  const [formValid, setFormValid] = useState(false);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    props.onSetInit();
  }, []);

  const inputChangeHandler = (event, inputIdentifier) => {
    let passwordValue = registerForm["password"].value;
    let isValid = true;
    let msg = "";
    for (let validator of registerForm[inputIdentifier].validators) {
      isValid = validator(event.target.value, passwordValue).isTrue && isValid;
      msg = validator(event.target.value).msg;
    }

    const updatedFormElement = {
      ...registerForm[inputIdentifier], 
      value: event.target.value,
      isValid: isValid,
      touched: true,
      errorMessage: msg,
    };
    const updatedRegisterForm = {
      ...registerForm,
      [inputIdentifier]: updatedFormElement,
    };

    let formIsValid = true;
    for (let inputIdentifier in updatedRegisterForm) {
      formIsValid = updatedRegisterForm[inputIdentifier].isValid && formIsValid;
    }
    setRegisterForm(updatedRegisterForm);
    setFormValid(formIsValid);
  };

  const registerFormHandler = (event) => {
    setClicked(true);
    const register = {};
    for (let key in registerForm) {
      register[key] = registerForm[key].value;
    }
    if (!formValid) {
      setFormValid(false);
      event.preventDefault();
    } else {
      console.log(props);
      props.onRegister(register, props);
      setShow(true);
    }
  };

  let formArray = [];
  for (let key in registerForm) {
    formArray.push({
      id: key,
      config: registerForm[key],
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
      elementStyle={classes.inputStyle}
      inputStyle={classes.inputStyle}
    />
  ));

  let spinner = props.loading ? (
    <Modal show={show}>Processing your registration request</Modal>
  ) : (
    ""
  );

  let error = props.error ? props.error.message : "";

  return (
    <>
      {spinner}
      <div className={classes.Register}>
        <h1>Let's Get Started</h1>
        <p style={{ color: "red" }}>{error}</p>
        {form}
        <Button
          style={classes.Button}
          btntype="success"
          clicked={registerFormHandler}
          disabled={props.disabled}
        >
          Register
        </Button>
        <div>
          <LinkButton styleType="success" link="/login">
            Login
          </LinkButton>
        </div>
       
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onRegister: (userData, props) => {
      dispatch(actionCreators.register(userData, props));
    },
    onSetInit: () => {
      dispatch(actionCreators.setInit());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
