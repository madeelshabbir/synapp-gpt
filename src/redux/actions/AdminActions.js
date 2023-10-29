//AXIOS
import axios from "axios";
//COMMON API
import { ApiServer } from "../../ApiConstant";
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
    USER_PROFILE_REQUEST,
    USER_PROFILE_SUCCESS,
    USER_PROFILE_FAILURE,
} from "../constants/AdminConstants";







//ADMIN LIST ACTIONS
export const AddFileAction = (formData) => async (dispatch) => {
 // console.log("function claa",formData)
  try {
    dispatch({ type: ADMIN_FILE_REQUEST });
   
    // var bodyFormData = new FormData();
    // bodyFormData.append("file", formData);
    const { data } = await axios.post(ApiServer + "/api/admin/upload-file/", formData);
    dispatch({
      type: ADMIN_FILE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_FILE_FAILURE,
      payload: error,
    });
  }
};

//ADD ADMIN LIST ACTIONS

//ADMIN LIST ACTIONS
export const ListUserAction = () => async (dispatch) => {
 // console.log("call for get all user")
   const  access_token=localStorage.getItem("access_token")
    try {
      dispatch({ type: LIST_USER_REQUEST });
      const config = {
          headers: {
            Authorization: `Bearer ${
              localStorage.getItem("access_token")
            }`,
          },
        };
     
  
      const { data } = await axios.get(ApiServer + `/api/admin/get-all-user/`,config);
      dispatch({
        type: LIST_USER_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: LIST_USER_FAILURE,
        payload: error,
      });
    }
  };

  // const config = {
  //   headers: {
  //     Authorization: `Bearer ${
  //       JSON.parse(localStorage.getItem("userInfo"))["access"]
  //     }`,
  //   },
  // };

  // GETTING ADMIN PARAMETER
  export const ParameterGetAction = () => async (dispatch) => {
   // console.log("call for get all user")
      try {
        dispatch({ type: ADMIN_PARAMETER_REQUEST });
    
        const { data } = await axios.get(ApiServer + "/api/admin/parameter/");
        dispatch({
          type: ADMIN_PARAMETER_SUCCESS,
          payload: data,
        });
      } catch (error) {
        dispatch({
          type: ADMIN_PARAMETER_FAILURE,
          payload: error,
        });
      }
    };
  

// UPDATE ADMIN ACTIONS for Parameter
export const UpdateParameterAdminAction = ({ temperture,
  max_length,
  frequency_penalty,
  presence_penalty,
  top_p,
  model_name, }) => async (dispatch) => {
    console.log("update",temperture,max_length)
    try {
      dispatch({
        type: UPDATE_ADMIN_PARAMETER_REQUEST,
      });
      
      
      
      const { data } = await axios.put(ApiServer + `/api/admin/parameter/`,
        {
          temperture: temperture,
          max_length: max_length,
          frequency_penalty: frequency_penalty,
          presence_penalty: presence_penalty,
          top_p: top_p,
          model_name:model_name,
        }
      
      );
      dispatch({
        type: UPDATE_ADMIN_PARAMETER_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_ADMIN_PARAMETER_FAILURE,
        payload: error.detail,
      });
    }
  };


  // GETTING ADMIN Subcriber
  export const GetSubciberAction = () => async (dispatch) => {
   // console.log("call for get all user")
      try {
        dispatch({ type: ADMIN_SUBCRIBER_REQUEST });
      
        const { data } = await axios.get(ApiServer + "/api/admin/unsubcriber/");
        dispatch({
          type: ADMIN_SUBCRIBER_SUCCESS,
          payload: data,
        });
      } catch (error) {
        dispatch({
          type: ADMIN_SUBCRIBER_FAILURE,
          payload: error,
        });
      }
    };
  

// UPDATE ADMIN ACTIONS for Parameter
export const UpdateSubcriberAction = ({ subcriber,unsubcriber
   }) => async (dispatch) => {
   // console.log("update subcriber",subcriber)
    try {
      dispatch({
        type: UPDATE_ADMIN_SUBCRIBER_REQUEST,
      });
      
  
      const { data } = await axios.put(ApiServer + `/api/admin/subcriber/`,
        {
          subcriber: subcriber,
          unsubcriber: unsubcriber,
        
        }
      
      );
      dispatch({
        type: UPDATE_ADMIN_SUBCRIBER_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_ADMIN_SUBCRIBER_FAILURE,
        payload: error.detail,
      });
    }
  };