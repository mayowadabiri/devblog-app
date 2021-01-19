// @ts-nocheck
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Button from "../../../components/UI/Button/Button";
import Input from "../../../components/UI/Input/Input";
import classes from "../Auth.module.css";
import * as actionCreators from "../../../store/action/index";
import Modal from "../../../components/Modal/Modal";
import { password, username } from "../../../helpers/validation";
import LinkButton from "../../../components/UI/Link/Link";

const Login = (props) => {
  // console.log(props)
  const [loginForm, setLoginForm] = useState({
    username: {
      elementType: "input",
      label: "username",
      elementConfig: {
        type: "text",
        placeholder: "Your Username",
      },
      validations: [username],
      value: "",
      isValid: false,
      touched: false,
      errorMessage: "",
    },
    password: {
      elementType: "input",
      label: "password",
      elementConfig: {
        type: "password",
        placeholder: "Password",
      },
      validations: [password],
      value: "",
      isValid: false,
      touched: false,
      errorMessage: "",
    },
  });

  const [show, setShow] = useState(false);
  const [formValid, setFormValid] = useState(false);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    props.onPathChange();
  }, []);

  const inputChangeHandler = (event, inputIdentifier) => {
    let isValid = true;
    let msg = "";
    for (let validation of loginForm[inputIdentifier].validations) {
      isValid = validation(event.target.value).isTrue && isValid;
      msg = validation(event.target.value).msg;
    }
    const updatedFormElement = {
      ...loginForm[inputIdentifier],
      value: event.target.value,
      isValid: isValid,
      touched: true,
      errorMessage: msg,
    };
    const updatedLoginForm = {
      ...loginForm,
      [inputIdentifier]: updatedFormElement,
    };

    let formIsValid = true;
    for (let inputIdentifier in updatedLoginForm) {
      formIsValid = updatedLoginForm[inputIdentifier].isValid && formIsValid;
    }

    setLoginForm(updatedLoginForm);
    setFormValid(formIsValid);
  };

  const loginHandler = (event) => {
    setClicked(true);
    const login = {};
    for (let key in loginForm) {
      login[key] = loginForm[key].value;
    }
    if (!formValid) {
      setFormValid(false);
      event.preventDefault();
    } else {
      setFormValid(true);
      props.onLogin(login, props);
      setShow(true);
    }
  };

  let formArray = [];
  for (let key in loginForm) {
    formArray.push({
      id: key,
      config: loginForm[key],
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
  let spinner = props.loading ? (
    <Modal show={show}>Logging you in immediately</Modal>
  ) : (
    ""
  );

  const error = props.error ? props.error.message : "";
  return (
    <>
      {spinner}
      <div className={classes.Form}>
        <div className={classes.LoginForm}>
          <h1>Login</h1>
          <p style={{ color: "red" }}>{error}</p>
          {form}
          <Button
            style={classes.Button}
            btntype="success"
            clicked={loginHandler}
            disabled={props.disabled}
          >
            Login
          </Button>
          <div>
            <LinkButton styleType="danger" link="/forgotpassword">
              Forgot Password?
            </LinkButton>
          </div>
          <div style={{ marginTop: "20px" }}>
            <LinkButton styleType="success" link="/register">
              Register
            </LinkButton>
          </div>
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
    onLogin: (userData, props) => {
      dispatch(actionCreators.login(userData, props));
    },
    onPathChange: () => {
      dispatch(actionCreators.setInit());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
