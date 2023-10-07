import { createContext, useState } from "react";

export let authContext=createContext();
export default function AuthProvider({children}){

    const [token, setToken] = useState("");
   

   
         
    return <authContext.Provider value={{token,setToken}}>
     {children}
    </authContext.Provider>
 }