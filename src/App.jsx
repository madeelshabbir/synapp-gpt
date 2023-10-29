import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { ChatComponent } from "./containers/chat";
import SecondNav from "./Components/User/Desktop/Container/SecondNav";
import UserTable from "./containers/admin/UserTable";
import Statistics from "./containers/admin/Statistics";
import SourcesModels from "./containers/admin/SourcesModels";
import { SignUpDefault } from "./containers/auth/SignUp/SignUpDefault";
//import { StepForm } from "./containers/auth/SignUp/StepForm";
import { SignUp } from "./containers/auth/SignUp/SignUp";
import { SignUpFinalScr } from "./containers/auth/SignUp/SignupFinalScr";
import { LoginEmail } from "./containers/auth/SignUp/LoginEmail";
import { NewPass } from "./containers/auth/SignUp/NewPass";
import { SubscriptionModal } from "./Components/modal/SubscriptionModal";
import HomePage from "./Components/User/HomePage/HomePage";
//import { useSelector ,useDispatch} from "react-redux";
import {login} from './redux/actions/LoginActions'

import { ConfirmPass } from "./containers/auth/SignUp/ConfirmPass";


import {FormMainControl} from "./containers/auth/SignUp/FormMainControl"
import { useEffect } from "react";
import  {Client ,Account,Databases ,ID}  from  'appwrite';

import PrivateRoutes from './utils/PrivateRoutes'
import { AuthProvider } from './utils/AuthContext'
import { useAuth } from "./utils/AuthContext";

function App() {


  const username=localStorage.getItem("username")
  const access_token=localStorage.getItem("access_token")
 
  // //const dispatch = useDispatch();
  //  const userLogin = useSelector((state) => state.userLogin);
  //  const { access_token } = userLogin;
 
  
  // const username=localStorage.getItem("username")
 

// useEffect(() => {
//   if (username) {
//     // Set the login time in local storage
//     localStorage.setItem('loginTime', Date.now());

//     // Check if 30 minutes have passed since login
//     const loginTime = localStorage.getItem('loginTime');
//     const thirtyMinutes = 1440 * 60 * 1000; // 30 minutes in milliseconds

//     const clearLocalStorage = () => {
//       // Clear the local storage
//       localStorage.clear();
//     };

//     const timeout = setTimeout(clearLocalStorage, thirtyMinutes);

//     return () => clearTimeout(timeout); // Clean up the timeout when the component unmounts
//   }
// }, [username]);

  console.log("username",username)
  console.log("access",access_token)
 
  return (
   

    <BrowserRouter>
     <AuthProvider>
          
          <Routes>
          <Route path="/finalscr" element={<SignUpFinalScr />} />
        <Route path="/newpass" element={<NewPass />} />
        <Route path="/login" element={<LoginEmail />} />
        <Route path="/signup" element={<FormMainControl />} />
        <Route path="/finalscr" element={<SignUpFinalScr />} />
        <Route path="/confirm-password" element={<ConfirmPass />} />
        <Route path="/" element={<ChatComponent/>}/>
           
           
            <Route element={<PrivateRoutes />}>
            <Route path="/chat" element={<ChatComponent/>}/>
            <Route path='/sourcesmodels' element={<SourcesModels></SourcesModels>} />
            <Route path='/statistics' element={<Statistics></Statistics>} />
            <Route path='/usertable' element={<UserTable></UserTable>} />
          
            </Route>
          </Routes>
        </AuthProvider>
   
    </BrowserRouter>
  );
}

export default App;
