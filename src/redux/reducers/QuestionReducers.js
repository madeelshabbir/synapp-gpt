//LOGIN CONSTANTS
import {
    USER_QUESTION_REQUEST,
    USER_QUESTION_SUCCESS,
    USER_QUESTION_FAILURE,
  } from "../constants/QuestionConstants";
  //Login Reducer
  export const userQuestionReducer = (state = {}, action) => {
    switch (action.type) {
      case USER_QUESTION_REQUEST:
        return { loading: true };
      case USER_QUESTION_SUCCESS:
        return {
          loading: false,
          answer: action.payload,
          success: true,
        };
      case USER_QUESTION_FAILURE:
        return { loading: false, error: action.payload };
     
      default:
        return state;
    }
  };
  
  // Logout Reducer
  