//LIST CONSTANTS
import {
  ADMIN_LIST_REQUEST,
  ADMIN_LIST_SUCCESS,
  ADMIN_LIST_FAILURE,
  ADD_LIST_ADMIN_REQUEST,
  ADD_LIST_ADMIN_SUCCESS,
  ADD_LIST_ADMIN_FAILURE,
  EDIT_ADMIN_LIST_REQUEST,
  EDIT_ADMIN_LIST_SUCCESS,
  EDIT_ADMIN_LIST_FAILURE,
  UPDATE_ADMIN_LIST_REQUEST,
  UPDATE_ADMIN_LIST_SUCCESS,
  UPDATE_ADMIN_LIST_FAILURE,
  UPDATE_ADMIN_LIST_RESET,
  DELETE_ADMIN_LIST_REQUEST,
  DELETE_ADMIN_LIST_SUCCESS,
  DELETE_ADMIN_LIST_FAILURE,
  ADMIN_USER__DROPDOWN_REQUEST,
  ADMIN_USER__DROPDOWN_SUCCESS,
  ADMIN_USER__DROPDOWN_FAILURE,
} from "../constants/ListConstants";

// ADMIN LIST REDUCER
export const adminListReducer = (state = { data: [] }, action) => {
  switch (action.type) {
    case ADMIN_LIST_REQUEST:
      return { loading: true, admin: [] };
    case ADMIN_LIST_SUCCESS:
      return { loading: false, admin: action.payload };
    case ADMIN_LIST_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// ADD ADMIN LIST REDUCER

export const AddAdminListReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_LIST_ADMIN_REQUEST:
      return { loading: true };
    case ADD_LIST_ADMIN_SUCCESS:
      return { loading: false, addadminlist: action.payload };
    case ADD_LIST_ADMIN_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// EDIT ADMIN REDUCER
export const EditAdminListReducer = (state = {}, action) => {
  switch (action.type) {
    case EDIT_ADMIN_LIST_REQUEST:
      return { loading: true };
    case EDIT_ADMIN_LIST_SUCCESS:
      return { loading: false, editadminlist: action.payload };
    case EDIT_ADMIN_LIST_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
// UPDATE ADMIN REDUCER
export const UpdateAdminListReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_ADMIN_LIST_REQUEST:
      return { loading: true };
    case UPDATE_ADMIN_LIST_SUCCESS:
      return {
        loading: false,
        success: true,
        updateadminlist: action.payload,
      };
    case UPDATE_ADMIN_LIST_FAILURE:
      return { loading: false, error: action.payload };
    case UPDATE_ADMIN_LIST_RESET:
      return {};
    default:
      return state;
  }
};
// DELETE ADMIN REDUCER
export const DeleteAdminListReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_ADMIN_LIST_REQUEST:
      return { loading: true };
    case DELETE_ADMIN_LIST_SUCCESS:
      return { loading: false, deleteadminlist: action.payload };
    case DELETE_ADMIN_LIST_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// ADMIN USER DROPDOWN REDUCER
export const adminDropdownReducer = (state = { data: [] }, action) => {
  switch (action.type) {
    case ADMIN_USER__DROPDOWN_REQUEST:
      return { loading: true, admindropdown: [] };
    case ADMIN_USER__DROPDOWN_SUCCESS:
      return { loading: false, admindropdown: action.payload };
    case ADMIN_USER__DROPDOWN_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
