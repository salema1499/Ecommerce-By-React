import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'

import style from './Brands.module.css'

export default function Brands() {
  const [brands, setBrands] = useState([])
  async function getAllBrands(){
    let {data}=await axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
   //  console.log(data?.data)
     setBrands(data?.data)
  }

  useEffect(() => {
    getAllBrands()
   
  }, []);
  return (
    <>
      <>
        <div className="container bg-success rounded-5 mt-3">
         <div className="row g-2">
         <h1 className='text-center text-white mb-2 fs-1 '>Our Brands</h1>
           {brands.map((one) => {
             return (
               <>
               <Helmet>
                <meta charSet="utf-8" />
                <title>Brands </title>
               </Helmet>
                 <div className="col-lg-3">
                   <Link to={`/categoriesdetalis/${one._id}`}>
                   <div className='text-center m-auto '>
                   <img
                       className={`w-50 rounded-circle m-2 ${style.img}`} 
                       height={200}
                       src={one.image}
                       alt=""
                     />
                   </div>
                    
                     {/* <h5 className="text-white text-center mt-2">
                       {one.name}
                     </h5> */}
                   </Link>
                 </div>
               </>
             );
           })}
         </div>
       </div>
     </> 
    
    </>
  )
}
