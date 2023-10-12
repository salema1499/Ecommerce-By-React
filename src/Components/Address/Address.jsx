import React, { useContext } from 'react'
import { useFormik } from 'formik';

import { cartContext } from '../Context/cartContext';

export default function Address() {
   let{paymentCheckout,cartId}= useContext(cartContext)
   
    async function submitHandel(values){
        let response=await paymentCheckout(cartId,'http://localhost:3000',values)
        //  console.log(response?.data.session.url);
        // window.location.href=response?.data.session.url

      // console.log(values);
    }
    let formik=useFormik({
        initialValues:{
            address:"",
            phone:"",
             city:""   },
        onSubmit:submitHandel     
    })
  return (
    <>
        <div className='container'>
            <form onSubmit={formik.handleSubmit}>
              <label htmlFor='address'>Enter Ur Detalis :</label>
              <input type='text' name='address' id='address' className='form-control' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.address}/>
           
              <label htmlFor='phone'>Enter Ur Phone :</label>
              <input type='tel' name='phone' id='phone' className='form-control' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.phone}/>
              

              <label htmlFor='city'>Enter Ur City :</label>
              <input type='text' name='city' id='city' className='form-control' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.city}/>
           

              <button type='submit' className='btn btn-success text-white text-center p-2 m-2'>Pay Now</button>
            </form>
        </div>
    </>
  )
}
