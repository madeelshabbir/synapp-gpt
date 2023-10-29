//AXIOS
import axios from "axios";
//COMMON API
import { ApiServer } from "../../ApiConstant";

//JWT-DECODER
import jwt from "jwt-decode";
//LOGIN CONSTANTS
import {
    USER_QUESTION_REQUEST,
    USER_QUESTION_SUCCESS,
    USER_QUESTION_FAILURE,
} from "../constants/QuestionConstants";

//LOGIN ACTIONS
export const Question = (bodyFormData) => async (dispatch) => {
   
  try {
    dispatch({
      type: USER_QUESTION_REQUEST,
    });
    // var bodyFormData = new FormData();
    // bodyFormData.append("question", question);
    const { data } = await axios.post(ApiServer + "/api/admin/question/", bodyFormData);
   
   
    //storeToken(res.data.token)
    //console.log("tokenn", data.token.access);
    // const user = jwt(token);
    // console.log("userr", user.user_id);
    dispatch({
      type: USER_QUESTION_SUCCESS,
      payload: data,
    });
    //console.log("success", data);
    // localStorage.setItem("userInfo", JSON.stringify(data));
    // localStorage.setItem("user", JSON.stringify(user.user_id));
    
  } catch (error) {
    dispatch({
      type: USER_QUESTION_FAILURE,
      payload: error
     
    });
   
  }
};

// Logout Actions

// export const Logout = () => (dispatch) => {
//   window.localStorage.clear();
//   localStorage.removeItem('access_token')
//   localStorage.removeItem('refresh_token')

//   window.location.reload();
//   dispatch({ type: USER_LOGOUT });
// };
