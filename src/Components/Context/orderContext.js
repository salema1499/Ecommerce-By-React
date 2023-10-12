import { createContext } from "react";
import axios from "axios";

export let orderContext=createContext()

function getOrders(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/orders`
    ).then((res)=>res).catch((err)=>err)
}
export default function orderContextProvider({children}){
    return <orderContext.Provider value={getOrders}>
        {children}
    </orderContext.Provider>
}
