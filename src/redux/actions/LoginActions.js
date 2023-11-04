import axios from "axios";

import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,
  USER_LOGOUT,
} from "../constants/LoginConstants";

export const login = (username, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });
    var bodyFormData = new FormData();
    bodyFormData.append("email", username);
    bodyFormData.append("password", password);
    const apiServer = import.meta.env.VITE_REACT_APP_API_URL;

    const { data } = await axios.post(`${apiServer}/api/login/`, bodyFormData);
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
      username:data.username,
    });
    localStorage.setItem('access_token', data.token.access)
    localStorage.setItem('refresh_token', data.token.refresh)
    localStorage.setItem('username', data.username)
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAILURE,
      payload: error
    });
  }
};

export const Logout = () => (dispatch) => {
  window.localStorage.clear();
  localStorage.clear();
  localStorage.removeItem('access_token')
  localStorage.removeItem('refresh_token')

  window.location.reload();
  dispatch({ type: USER_LOGOUT });
};
