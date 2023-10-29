//LIST USER CONSTANTS
import {
  LIST_USER_REQUEST,
  LIST_USER_SUCCESS,
  LIST_USER_FAILURE,
  ADD_LIST_USER_REQUEST,
  ADD_LIST_USER_SUCCESS,
  ADD_LIST_USER_FAILURE,
  LIST_USER_CALORIES_REQUEST,
  LIST_USER_CALORIES_SUCCESS,
  LIST_USER_CALORIES_FAILURE,
} from "../constants/ListUserConstants";

// USER LIST REDUCER

export const userListReducer = (state = { data: [] }, action) => {
  switch (action.type) {
    case LIST_USER_REQUEST:
      return { loading: true, user: [] };
    case LIST_USER_SUCCESS:
      return { loading: false, user: action.payload };
    case LIST_USER_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// ADD USER LIST REDUCER

export const AddUserListReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_LIST_USER_REQUEST:
      return { loading: true };
    case ADD_LIST_USER_SUCCESS:
      return { loading: false, adduserlist: action.payload };
    case ADD_LIST_USER_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// USER LIST REQUEST REDUCER

export const userListRequestReducer = (state = { data: [] }, action) => {
  switch (action.type) {
    case LIST_USER_CALORIES_REQUEST:
      return { loading: true, req: [] };
    case LIST_USER_CALORIES_SUCCESS:
      return { loading: false, req: action.payload };
    case LIST_USER_CALORIES_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
