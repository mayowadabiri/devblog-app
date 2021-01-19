// @ts-nocheck

import * as actionTypes from "./actionTypes";
import axios from "../../constants/axios-create";
import jwt from "jsonwebtoken";

export const registerStart = () => {
  return {
    type: actionTypes.REGISTER__START,
  };
};

export const registerSuccess = (user) => {
  return {
    type: actionTypes.REGISTER__SUCCESS,
    user: user,
  };
};

export const registerFailed = (error) => {
  return {
    type: actionTypes.REGISTER__FAILED,
    error: error,
  };
};

export const register = (userData, props) => (dispatch) => {
  dispatch(registerStart());
  console.log(props);
  axios
    .post("/user/signup", userData)
    .then((result) => {
      dispatch(registerSuccess(result.data));
      props.history.push("/verifyemail");
    })
    .catch((error) => {
      console.log(error);
      if (error.response === undefined) {
        dispatch(registerFailed({ message: "Internet Connection error" }));
      } else {
        dispatch(registerFailed(error.response.data));
      }
    });
};

export const loginStart = () => {
  return {
    type: actionTypes.LOGIN__START,
  };
};

export const loginSuccess = (token) => {
  return {
    type: actionTypes.LOGIN__SUCCESS,
    token: token,
  };
};

export const loginFailed = (error) => {
  return {
    type: actionTypes.LOGIN__FAILED,
    error: error,
  };
};

export const checkAuthTimeout = (expire) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expire * 1000);
  };
};

export const login = (loginData, props) => (dispatch) => {
  dispatch(loginStart());
  axios
    .post("/user/signin", loginData)
    .then((result) => {
      const { token, image, username } = result.data;
      const expiresIn = jwt.decode(token).exp;
      const expiration = new Date(expiresIn * 1000);
      localStorage.setItem("token", token);
      localStorage.setItem("expiresIn", expiration);
      localStorage.setItem("image", image);
      localStorage.setItem("username", username);
      dispatch(loginSuccess(token));
      checkAuthTimeout(expiresIn);
      if (props.location.search) {
        var redirect = Boolean(props.location.search.split("=").pop());
        if (redirect) {
          props.history.goBack();
        }
      } else {
        props.history.push("/home");
      }
    })
    .catch((error) => {
      console.log(error.response);
      dispatch(loginFailed(error.response.data));
    });
};

export const setInit = () => {
  return {
    type: actionTypes.SET__INIT,
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expiresIn");
  localStorage.removeItem("image");
  localStorage.removeItem("username");
  return {
    type: actionTypes.LOGOUT__INIT,
  };
};

export const checkAuth = () => (dispatch) => {
  const token = localStorage.getItem("token");
  const expiration = localStorage.getItem("expiresIn");
  const expiresIn = new Date(expiration);
  if (!token || expiresIn <= new Date()) {
    dispatch(logout());
  } else {
    dispatch(loginSuccess(token));
    dispatch(
      checkAuthTimeout(
        Math.ceil(expiresIn.getTime() - new Date().getTime()) / 1000
      )
    );
  }
};
