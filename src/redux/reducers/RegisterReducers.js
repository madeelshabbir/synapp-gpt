//LOGIN CONSTANTS
import {
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAILURE,
    USER_LOGOUT,
    USER_FORGETPASS_REQUEST,
    USER_FORGETPASS_SUCCESS,
    USER_FORGETPASS_FAILURE,
  } from "../constants/RegisterConstants";
  //Register  Reducer  
  export const forgetPasswordReducer = (state = {}, action) => {
  
    switch (action.type) {
      
      
      
      case USER_FORGETPASS_REQUEST:
        return { loading: true };
      case USER_FORGETPASS_SUCCESS:
        return {
          loading: false,
          forgetdata: action.payload,
          success: true,
        };
      case USER_FORGETPASS_FAILURE:
        return { loading: false, error: action.payload?.response?.data?.errors};
      case USER_LOGOUT:
        return {};
      default:
        return state;
    }
  };
  
 

   //Register Reducers  Reducer
   export const userRegisterReducer = (state = {}, action) => {
    switch (action.type) {
      case USER_REGISTER_REQUEST:
        return { loading: true };
      case USER_REGISTER_SUCCESS:
        return {
          loading: false,
          registerdata: action.payload,
          success: true,
        };
      case USER_REGISTER_FAILURE:
        return { loading: false, error: action.payload };
      case USER_LOGOUT:
        return {};
      default:
        return state;
    }
  };
  