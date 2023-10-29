//LIST CONSTANTS
import {
    ADMIN_FILE_SUCCESS,
    ADMIN_FILE_REQUEST,
    ADMIN_FILE_FAILURE,
    LIST_USER_REQUEST,
    LIST_USER_SUCCESS,
    LIST_USER_FAILURE,
    ADMIN_PARAMETER_REQUEST,
    ADMIN_PARAMETER_SUCCESS,
    ADMIN_PARAMETER_FAILURE,
    UPDATE_ADMIN_PARAMETER_REQUEST,
    UPDATE_ADMIN_PARAMETER_SUCCESS,
    UPDATE_ADMIN_PARAMETER_FAILURE,
    ADMIN_SUBCRIBER_REQUEST,
    ADMIN_SUBCRIBER_SUCCESS,
    ADMIN_SUBCRIBER_FAILURE,
    UPDATE_ADMIN_SUBCRIBER_REQUEST,
    UPDATE_ADMIN_SUBCRIBER_SUCCESS,
    UPDATE_ADMIN_SUBCRIBER_FAILURE,
} from "../constants/AdminConstants";




// ADMIN  update Subcriber REDUCER 
export const UpdateSubcriberReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_ADMIN_SUBCRIBER_REQUEST:
      return { loading: true };
    case UPDATE_ADMIN_SUBCRIBER_SUCCESS:
      return {
        loading: false,
        success: true,
        adminupdatesubcriber: action.payload,
      };
    case UPDATE_ADMIN_SUBCRIBER_FAILURE:
      return { loading: false, error: action.payload };
   
    default:
      return state;
  }
};
// ADMIN  GEt Parameter REDUCER 
export const GetSubcriberReducers = (state = { data: [] }, action) => {
  switch (action.type) {
    case ADMIN_SUBCRIBER_REQUEST:
      return { loading: true, userdata: [] };
    case ADMIN_SUBCRIBER_SUCCESS:
      return { loading: false, subcriberdata: action.payload };
    case ADMIN_SUBCRIBER_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// ADMIN  update Parameter REDUCER 
export const UpdateAdminParameterReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_ADMIN_PARAMETER_REQUEST:
      return { loading: true };
    case UPDATE_ADMIN_PARAMETER_SUCCESS:
      return {
        loading: false,
        success: true,
        adminupdateparameter: action.payload,
      };
    case UPDATE_ADMIN_PARAMETER_FAILURE:
      return { loading: false, error: action.payload };
   
    default:
      return state;
  }
};
// ADMIN  GEt Parameter REDUCER 
export const GetParameterReducers = (state = { data: [] }, action) => {
  switch (action.type) {
    case ADMIN_PARAMETER_REQUEST:
      return { loading: true, userdata: [] };
    case ADMIN_PARAMETER_SUCCESS:
      return { loading: false, parameterdata: action.payload };
    case ADMIN_PARAMETER_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
  
  // ADMIN  USER LIST REDUCER 
  export const ListUserReducers = (state = { data: [] }, action) => {
    switch (action.type) {
      case LIST_USER_REQUEST:
        return { loading: true, userdata: [] };
      case LIST_USER_SUCCESS:
        return { loading: false, userdata: action.payload };
      case LIST_USER_FAILURE:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  // ADD ADMIN FILE REDUCER
  
  export const adminFileReducer = (state = {}, action) => {
    switch (action.type) {
      case ADMIN_FILE_REQUEST:
        return { loading: true };
      case ADMIN_FILE_SUCCESS:
        return { loading: false, adminfile: action.payload };
      case ADMIN_FILE_FAILURE:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  