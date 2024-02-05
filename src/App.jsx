import { BrowserRouter, Route, Routes } from "react-router-dom";

import { ChatComponent } from "./containers/chat";
import UserTable from "./containers/admin/UserTable";
import Statistics from "./containers/admin/Statistics";
import SourcesModels from "./containers/admin/SourcesModels";
import Files from "./containers/admin/Files";
import { SignUpFinalScr } from "./containers/auth/SignUp/SignupFinalScr";
import { LoginEmail } from "./containers/auth/SignUp/LoginEmail";
import { NewPass } from "./containers/auth/SignUp/NewPass";
import { ConfirmPass } from "./containers/auth/SignUp/ConfirmPass";
import {FormMainControl} from "./containers/auth/SignUp/FormMainControl"
import PrivateRoutes from './utils/PrivateRoutes'
import { AuthProvider } from './utils/AuthContext'

function App() {
  const username=localStorage.getItem("username")
  const access_token=localStorage.getItem("access_token")

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
          <Route path='/files' element={<Files></Files>} />
          <Route path='/usertable' element={<UserTable></UserTable>} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
