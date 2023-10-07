import React, { useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

export default function Register() {
  //let regEmail=/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
  let regPassword = /^[A-Z]{1}[a-z]{5,10}$/;
  let regphone = /^01(0|1|2|5)[0-9]{8}$/;
  // function validate(values){
  //   let errors={};
  //   if(formik.values.name===""){
  //     errors.name='name is required'

  //   }else if(formik.values.name.length<3){
  //     errors.name='name must be minlength is 3'
  //   }else if(formik.values.name.length>10){
  //     errors.name='name must be maxlength is 10'
  //   }

  //   if(values.email===""){
  //     errors.email='eamil is required'
  //   }else if(regEmail.test(values.email)){
  //     errors.email='eamil must be this ex => "username@gmail.com"'
  //   }

  //   if(values.phone===""){
  //     errors.phone='phone is required'
  //   }else if(regphone.test(values.phone)){
  //     errors.phone='phone must be this ex => "01148577042"'
  //   }

  //   return errors
  // }
  let Navigate = useNavigate();
  const [error, seterror] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  let validationSchema = yup.object({
    name: yup
      .string()
      .min(3, "name must be greater than 3 letters")
      .max(20, "name must be less than 20 letters")
      .required("name is required"),
    email: yup.string().email("email is invaild").required("email required"),
    phone: yup.string().matches(regphone).required("phone required"),
    password: yup
      .string()
      .matches(
        regPassword,
        "you must startwith upperLetter and lowuerLetters greater than 5 letters and less than 10 letters"
      )
      .required("password invaild"),
    rePassword: yup
      .string()
      .oneOf(
        [yup.ref("password")],
        "the rePassword must be matches your password"
      )
      .required("rePassword is must be equal password!!!"),
  });
  async function submitform(values) {
    setisLoading(true)
    let res = await axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values)
      .catch((err) => {
        setisLoading(false);
        seterror(err.response.data.message);
      });
    if (res.data.message === "success") {
      setisLoading(false);
      Navigate("/login");
    }
  }
  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema,
    onSubmit: submitform,
  });
  return (
    <>
     <Helmet>
                <meta charSet="utf-8" />
                <title>Register</title>
                {/* <link rel="canonical" href="http://mysite.com/example" /> */}
     </Helmet>
      <div className="w-50 mx-auto mt-5">
        {error !== null ? (
          <div className="alert alert-danger">{error}</div>
        ) : (
          ""
        )}

        <h2>Register Now :</h2>
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="form-control my-2 px-2"
          />
          {formik.errors.name && formik.touched.name ? (
            <div className="alert alert-danger">{formik.errors.name}</div>
          ) : null}

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

          <label htmlFor="phone">Phone:</label>
          <input
            type="tel"
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="form-control my-2 px-2"
          />
          {formik.errors.phone && formik.touched.phone ? (
            <div className="alert alert-danger">{formik.errors.phone}</div>
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

          <label htmlFor="rePassword">rePassword:</label>
          <input
            type="password"
            name="rePassword"
            value={formik.values.rePassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="form-control my-2 px-2"
          />
          {formik.errors.rePassword && formik.touched.rePassword ? (
            <div className="alert alert-danger">{formik.errors.rePassword}</div>
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
              Register
            </button>
          }
        </form>
      </div>
    </>
  );
}
