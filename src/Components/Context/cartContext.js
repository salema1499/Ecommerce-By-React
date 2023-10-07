import { createContext } from "react";
import axios from "axios";

export let cartContext=createContext()

function AddToCart(id){
    
    return axios.post(`https://ecommerce.routemisr.com/api/v1/cart/`,{productId:id},{
     headers:{
         token:localStorage.getItem('token'),
        
     }
    }).then((res)=>res).catch((err)=>err)
    
 }
 
function displayCart(){
    return axios.get('https://ecommerce.routemisr.com/api/v1/cart',{headers:{
        token:localStorage.getItem('token')
    }}).then((res)=>res).catch((err)=>err)
}

function updataCountCart(id,count){
   return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{productId:id,count:count},{
    headers:{
        token:localStorage.getItem('token')
    }
   })
}

function removeItemCart(id){
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{headers:{
        token:localStorage.getItem('token')
    }})
}
function removeAllCart(){
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,{headers:{
        token:localStorage.getItem('token')
    }})
}
export default function CartContextProvider({children}){
    return <cartContext.Provider value={{AddToCart,displayCart,updataCountCart,removeItemCart,removeAllCart}}>
        {children}
    </cartContext.Provider>
}