import React, { useContext, useEffect } from 'react'
import { Offline } from "react-detect-offline";
import { Outlet } from 'react-router-dom';

import Footer from './../Footer/Footer'
import Navbar from './../Navbar/Navbar';
import { authContext } from '../Context/authContext';

export default function Layout() {
   let {setToken}=useContext(authContext);
   useEffect(() => {
          if(localStorage.getItem('token')!==null){
             setToken(localStorage.getItem('token'))
          }
         },[]);
  return (
    <>
    <Navbar/>
     <Outlet></Outlet>
   
     <span className='netWork'>
     
     <Offline >
     <span className='off my-3'>
     <i className="fa-solid fa-wifi" /> You Are offline (surprise!)
     </span>
      </Offline>
    
  
     
     </span>
     
   
    <Footer/>
        
    </>
  )
}
