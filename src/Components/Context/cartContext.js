import { createContext, useEffect, useState } from "react";
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
   return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{count:count},{
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

function getUserOrder(id){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`
    ).then((res)=>res).catch((err)=>err)
}
export default function CartContextProvider({children}){
    const [cartId, setcartId] = useState(null)
    async function getCart(){
        let {data}=await displayCart();
        setcartId(data?.data._id)
        console.log(data?.data._id);

    }
    useEffect(()=>{
        getCart();
    },[])
    
    function paymentCheckout(cartId,url,values){
        return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`,{shippingAddress:values},{
         headers:{
             token:localStorage.getItem('token')
         }
        }).then((response)=>{console.log(response?.data.session.url);
        window.location.href=response?.data.session.url})
        .catch((err)=>console.log(err))
     }
    
    return <cartContext.Provider value={{cartId,AddToCart,displayCart,getUserOrder,updataCountCart,removeItemCart,removeAllCart,paymentCheckout}}>
        {children}
    </cartContext.Provider>
}