import React, {  useContext } from 'react'
import jwtDecode from 'jwt-decode'

import { authContext } from '../Context/authContext'

export default function Profile() {
   let{userData}= useContext(authContext)
//    let{setUserData}= useContext(createContext)
    let enCode=localStorage.getItem("token")
    let deCode=jwtDecode(enCode)
    console.log(deCode);
  return (
    <>
        <div className='container'>
          <h2>welcome : {userData.name}</h2>
         <h3> email :{userData.email}</h3>
        </div>
    </>
  )
}
