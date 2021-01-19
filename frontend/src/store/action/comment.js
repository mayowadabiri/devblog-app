import axiosURL from "../../constants/axios-create";
import * as actionTypes from "./actionTypes";

const token = localStorage.getItem("token")

export const createCommentStart = () => {
  return {
    type: actionTypes.CREATE__COMMENT__START,
  };
};

export const createCommentSuccess = (comment) => {
  return {
    type: actionTypes.CREATE__COMMENT__SUCCESS,
    comment,
  };
};

export const createCommentFailed = (error) => {
  return {
    type: actionTypes.CREATE__COMMENT__FAILED,
    error,
  };
};

export const createComment = (commentData, id) => (dispatch) => {
  dispatch(createCommentStart());

  axiosURL
    .post(`/create/comment/${id}`, commentData, {
        headers:{
          "Authorization": `Bearer ${token}`
        }
    })
    .then((result) => {
      console.log(result.data)
      dispatch(createCommentSuccess(result.data.comment));
      dispatch(fetchComments(id))
    })
    .catch((error) => {
      dispatch(createCommentFailed(error.response));
    });
};


export const fetchCommentsStart = () =>{
  return {
    type: actionTypes.FETCH__COMMENT__START
  }
}

export const fetchCommentsSuccess = (comments) =>{
  return {
    type: actionTypes.FETCH__COMMENT__SUCCESS,
    comments
  }
}
export const fetchCommentsFailed = (error) =>{
  return {
    type: actionTypes.FETCH__COMMENT__FAILED,
    error
  }
}

export const fetchComments = (id) => dispatch =>{
  dispatch(fetchCommentsStart());
  axiosURL.get(`/comment/blog/${id}`, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
    .then(result => {
    dispatch(fetchCommentsSuccess(result.data.comments))
  }).catch(error =>{
    dispatch(fetchCommentsFailed(error.response))
  })
}