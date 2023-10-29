import { createContext, useState, useEffect, useContext } from "react";
import { account } from "../appwriteConfig";
import { useNavigate } from "react-router-dom";
import { Account, ID} from 'appwrite';
import zIndex from "@material-ui/core/styles/zIndex";

const AuthContext = createContext()

export const AuthProvider = ({children}) => {
        //const navigate = useNavigate()



        const [loading, setLoading] = useState(true)
        const [user, setUser] = useState(null)
        const [error, setError] = useState(null)
        const [register, setRegister] = useState(null)

        useEffect(() => {
            //setLoading(false)
            checkUserStatus()
         }, [])

         const loginUser = async (userInfo) => {
            setLoading(true)
            

            try{
                let response = await account.createEmailSession(userInfo.email, userInfo.password)
                let accountDetails = await account.get();
                console.log("user Details",accountDetails)
                localStorage.setItem("access_token",accountDetails.$id)
                localStorage.setItem("username",accountDetails.email)

                setUser(accountDetails) 
            }catch(error){
             
                console.error(error)
                setError("Connexion / signing in is not working")
              
               
            }
            setLoading(false)
            
         }

         const logoutUser = async () => {
            await account.deleteSession('current');
            setUser(null)
            localStorage.removeItem("access_token")
            localStorage.removeItem("username")
            setError(null)
         }

        

         const checkUserStatus = async () => {
            try{
                let accountDetails = await account.get();
                setUser(accountDetails)
            }catch(error){
                
            }
            setLoading(false)
         }

        const contextData = {
            user,
            error,
            loginUser,
            logoutUser,
            register,
        }

    return(
        <AuthContext.Provider value={contextData}>
            {children}
         
        {/* {loading ? <p style={{ zIndex: 99 }}>Loading...</p> : children} */}
        </AuthContext.Provider>
    )
}

//Custom Hook
export const useAuth = ()=> {return useContext(AuthContext)}

export default AuthContext;