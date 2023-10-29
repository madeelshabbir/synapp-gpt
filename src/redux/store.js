//REDUX
import { createStore, applyMiddleware, combineReducers } from "redux";
//REDUX-THUNK
import thunk from "redux-thunk";
//REDUX-DEVTOOLS-EXTENSION
import { composeWithDevTools } from "redux-devtools-extension";
//REDUCERS
import { userLoginReducer } from "./reducers/LoginReducers";
import { userRegisterReducer } from "./reducers/RegisterReducers";
import { forgetPasswordReducer } from "./reducers/RegisterReducers";
import {userQuestionReducer} from "./reducers/QuestionReducers";

// import {
//   adminListReducer,
//   EditAdminListReducer,
//   UpdateAdminListReducer,
//   DeleteAdminListReducer,
//   AddAdminListReducer,
//   adminDropdownReducer,
// } from "./reducers/ListReducers";
// import {
//   AddUserListReducer,
//   userListReducer,
//   userListRequestReducer,
// } from "./reducers/ListUserReducers";

import {
    ListUserReducers,
    adminFileReducer,
    GetParameterReducers,
    UpdateAdminParameterReducer,
    UpdateSubcriberReducer,
    GetSubcriberReducers,
} from "./reducers/AdminReducers"
//CALLING REDUCERS
const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userQuestion:userQuestionReducer,
  ListUser:ListUserReducers,
  AdminFile:adminFileReducer,
  getParameter:GetParameterReducers,
  updateparameter:UpdateAdminParameterReducer,
  getsubcriber:GetSubcriberReducers,
  updatesubcriber:UpdateSubcriberReducer,
  forgetPassword:forgetPasswordReducer,

});
const userInfoFromStorage = localStorage.getItem("access_token")
  ? localStorage.getItem("access_token")
  : null;
const initialState = {
  userLogin: { access_token: userInfoFromStorage },
};
const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
export default store;
