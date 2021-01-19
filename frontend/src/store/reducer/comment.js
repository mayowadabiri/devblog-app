import * as actionTypes from "../action/actionTypes";

const initialState = {
  comments: [],
  loading: false,
  error: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE__COMMENT__START:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.CREATE__COMMENT__SUCCESS:
      return {
        ...state,
        comments: state.comments.concat(action.comment),
        loading: false,
      };
    case actionTypes.CREATE__COMMENT__FAILED:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case actionTypes.FETCH__COMMENT__START:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.FETCH__COMMENT__SUCCESS:
      return {
        ...state,
        loading: false,
        comments: action.comments,
      };
    case actionTypes.FETCH__COMMENT__FAILED:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    default:
      return state;
  }
};

export default reducer;
