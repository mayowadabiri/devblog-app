import * as actionTypes from "../action/actionTypes";

const intialState = {
  user: {
    blogs: [],
    comments: [],
  },
  userDetails: {
    blogs: [],
  },
  loading: true,
  error: "",
  editing: false,
};

const reducer = (state = intialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH__USER__START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionTypes.FETCH__USER__SUCCESS:
      return {
        ...state,
        user: action.user,
        loading: false,
      };
    case actionTypes.FETCH__USER__FAILED:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case actionTypes.UPDATE__USER__START:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.UPDATE__USER__SUCCESS:
      return {
        ...state,
        user: action.user,
        loading: false,
        editing: false,
      };
    case actionTypes.UPDATE__USER__FAILED:
      return {
        ...state,
        loading: true,
        error: action.error,
      };
    case actionTypes.CHANGE__EDIT__STATE:
      return {
        ...state,
        editing: !state.editing,
      };
    case actionTypes.DELETE__BLOG__START:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.CREATE__COMMENT__SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          blogs: state.user.blogs.filter((blogId) => blogId.id !== action.id),
        },
      };
    case actionTypes.FETCH__DETAILS__START:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.FETCH__DETAILS__SUCCESS:
      return {
        ...state,
        loading: false,
        userDetails: action.details,
      };
    case actionTypes.FETCH__DETAILS__FAILED:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default reducer;
