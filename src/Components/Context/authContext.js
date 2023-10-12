import { createContext, useState } from "react";
import axios from "axios";

export let authContext=createContext();
export default function AuthProvider({children}){

    const [token, setToken] = useState("");
   const [userData, setUserData] = useState("")
    function filterProductcategery() {
        return axios.get("https://ecommerce.routemisr.com/api/v1/products");
      }
   
         
    return <authContext.Provider value={{token,setToken,filterProductcategery,userData,setUserData}}>
     {children}
    </authContext.Provider>
 }