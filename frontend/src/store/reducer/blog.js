import * as actionTypes from "../action/actionTypes";

const initialState = {
  blogs: [],
  blog: {
    userId: {
      
    },
  },
  loading: false,
  error: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE__BLOG__START:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.CREATE__BLOG__SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case actionTypes.CREATE__BLOG__FAILED:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case actionTypes.FETCH__BLOGS__START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionTypes.FETCH__BLOGS__SUCCESS:
      return {
        ...state,
        blogs: action.blogs,
        loading: false,
      };
    case actionTypes.FETCH__BLOGS__FAILED:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case actionTypes.FETCH__BLOG__START:
      return {
        ...state,
        loading: true,
        blog: {
          userId: {},
        },
      };
    case actionTypes.FETCH__BLOG__SUCCESS:
      return {
        ...state,
        blog: action.blog,
        loading: false,
      };
    case actionTypes.FETCH__BLOG__FAILED:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case actionTypes.UPDATE__BLOG__START:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.UPDATE__BLOG__SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case actionTypes.UPDATE__BLOG__FAILED:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case actionTypes.SET__BLOG__INIT:
      return {
        ...state,
        blog: {
          comments: [],
          user: {},
          loading: false,
        },
      };
    default:
      return state;
  }
};

export default reducer;
