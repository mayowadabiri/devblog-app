import * as actionTypes from "../action/actionTypes";

const intialState = {
  token: null,
  user: null,
  loading: false,
  error: null,
};

const reducer = (state = intialState, action) => {
  switch (action.type) {
    case actionTypes.REGISTER__START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionTypes.REGISTER__SUCCESS:
      return {
        ...state,
        user: action.user,
        loading: false,
        error: null,
      };
    case actionTypes.REGISTER__FAILED:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case actionTypes.LOGIN__START:
      return {
        ...state,
        loading: true,
        error: null,
        path: action.path,
      };
    case actionTypes.LOGIN__SUCCESS:
      return {
        loading: false,
        token: action.token,
      };
    case actionTypes.LOGIN__FAILED:
      return {
        loading: false,
        error: action.error,
        token: null
      };
    case actionTypes.SET__INIT:
      return {
        ...state,
        token: null,
        user: null,
        loading: false,
        error: null,
      };
    case actionTypes.LOGOUT__INIT:
      return{
        ...state,
        token: null,
        user: null,
        loading: false,
        error: null,
      }
    default:
      return state;
  }
};

export default reducer;
