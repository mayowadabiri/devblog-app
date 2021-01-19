import axiosURL from "../../constants/axios-create";
import * as actionTypes from "./actionTypes";

export const fetchUserStart = () => {
  return {
    type: actionTypes.FETCH__USER__START,
  };
};

export const fetchUserSuccess = (user) => {
  return {
    type: actionTypes.FETCH__USER__SUCCESS,
    user,
  };
};

export const fetchUserFailed = (error) => {
  return {
    type: actionTypes.FETCH__USER__FAILED,
    error,
  };
};

export const fetchUser = (username) => (dispatch) => {
  const token = localStorage.getItem("token");
  dispatch(fetchUserStart());
  axiosURL
    .get(`/user/${username}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((result) => {
      localStorage.setItem("image", result.data.user.image);
      dispatch(fetchUserSuccess(result.data.user));
    })
    .catch((error) => {
      dispatch(fetchUserFailed({message: "Error Fetching User, Pls try again later. You might want to check your network connection "}));
    });
};

export const updateUserStart = () => {
  return {
    type: actionTypes.UPDATE__USER__START,
  };
};

export const updateUserSuccess = (user) => {
  return {
    type: actionTypes.UPDATE__USER__SUCCESS,
    user: user,
  };
};

export const updateUserFailed = (error) => {
  return {
    type: actionTypes.UPDATE__USER__FAILED,
    error: error,
  };
};

export const updateUser = (data, props) => (dispatch) => {
  dispatch(updateUserStart());
  const token = localStorage.getItem("token");
  const username = props.match.params.username
  axiosURL
    .put("/user/update", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((result) => {
      dispatch(updateUserSuccess(result.data.user));
      localStorage.removeItem("image");
      localStorage.setItem("image", result.data.user.image);
      props.history.push(`/${username}`)
    })
    .catch((error) => {
      dispatch(updateUserFailed(error.response));
    });
};


export const fetchDetailsStart = () =>{
  return{
    type: actionTypes.FETCH__DETAILS__START
  }
}

export const fetchDetailsSuccess = (details) =>{
  return{
    type: actionTypes.FETCH__DETAILS__SUCCESS,
    details
  }
}

export const fetchDetailsFailed = (error) =>{
  return{
    type: actionTypes.FETCH__DETAILS__FAILED,
    error
  }
}

export const fetchDetails = (username) => dispatch =>{
  dispatch(fetchDetailsStart());

  axiosURL.get(`/userByUsername/${username}`)
  .then(result =>{
    dispatch(fetchDetailsSuccess(result.data.user))
  })
  .catch(error =>{
    dispatch(fetchDetailsFailed(error.response))
  })
}

export const toggleEdit = () => {
  return {
    type: actionTypes.CHANGE__EDIT__STATE,
  };
};
