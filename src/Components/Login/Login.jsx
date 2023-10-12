import React, { useContext, useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

import { authContext } from "../Context/authContext";

export default function Login() {
  let {setToken,setUserData}=useContext(authContext)
  let dataToken=''
  let regPassword = /^[A-Z]{1}[a-z]{5,10}$/;
  let Navigate = useNavigate();
  const [error, seterror] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  let validationSchema = yup.object({
   
    email: yup.string().email("email is invaild").required("email required"),
     password: yup.string().matches( regPassword,"you must startwith upperLetter and lowuerLetters greater than 5 letters and less than 10 letters" )
      .required("password invaild")}
  )
  
  async function submitform(values) {
    setisLoading(true)
    let res = await axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values)
      .catch((err) => {
        setisLoading(false);
        seterror(err.response.data.message);
      });
      //console.log("res",res);
    if (res.data.message === "success") {
      dataToken=res.data.token
      localStorage.setItem('token',dataToken)
      setToken(dataToken)
     setUserData(res?.data.user)
      setisLoading(false);
      Navigate("/");
    }
  }
  let formik = useFormik({
    initialValues: {
    
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: submitform,
  });
  return (
    <>
      <Helmet>
                <meta charSet="utf-8" />
                <title>Login</title>
                {/* <link rel="canonical" href="http://mysite.com/example" /> */}
      </Helmet>
      <div className="w-50 mx-auto mt-5">
        {error !== null ? (
          <div className="alert alert-danger">{error}</div>
        ) : (
          ""
        )}

        <h2>Login Now :</h2>
        <form onSubmit={formik.handleSubmit}>
          
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="form-control my-2 px-2"
          />
          {formik.errors.email && formik.touched.email ? (
            <div className="alert alert-danger">{formik.errors.email}</div>
          ) : (
            ""
          )}

         
          
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="form-control my-2 px-2"
          />
          {formik.errors.password && formik.touched.password ? (
            <div className="alert alert-danger">{formik.errors.password}</div>
          ) : (
            ""
          )}

        
          {/* dirty is mean touched */}
          {isLoading? 
            <button type="button" className="btn btn-success text-white my-2">
              <i className="fas fa-spinner fa-spin"></i>
            </button>
           : 
            <button
              type="submit"
              disabled={!(formik.isValid && formik.dirty)}
              className="btn btn-success text-white my-2"
            >
              Login
            </button>
          }
        </form>
      </div>
    </>
  );
}
