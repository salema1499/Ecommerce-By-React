import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import logo from "./../../Assets/Imgs/freshcart-logo.svg";
import Brands from './../Brands/Brands';
import { authContext } from "../Context/authContext";

import style from './Navbar.module.css'

export default function Navbar() {
  let navigate=useNavigate()
  let { token,setToken } = useContext(authContext);
  function logout(){
    localStorage.removeItem('token')
    setToken(null)
    navigate('/login')
  }
  return (
    <>
      <nav className={`${style.navbarbg} navbar  navbar-expand-lg  position-fixed top-0 start-0 end-0 z-2`}>
        <div className="container-fluid ">
          <Link className="navbar-brand" to="/">
            <img src={logo} alt="logo" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {token?<>    <li className="nav-item">
                <Link className="nav-link text-success fw-bold active text-success" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link text-success fw-bold "
                  aria-current="page"
                  to="/products"
                >
                  Products
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-success fw-bold " to="/categories">
                  Categories
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-success fw-bold" to="/brands">
                  Brands
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-success fw-bold " to="/cart">
                  Cart
                </Link>
              </li></>:""}
          
            </ul>

            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex align-items-center">
              <li className="nav-item">
                <i className="fa-brands fa-facebook mx-2" />
              </li>
              <li className="nav-item">
                <i className="fa-brands fa-twitter mx-2" />
              </li>
              <li className="nav-item">
                <i className="fa-brands fa-instagram mx-2" />
              </li>
              <li className="nav-item">
                <i className="fa-brands fa-youtube mx-2" />
              </li>
              <li className="nav-item">
                <i className="fa-brands fa-tiktok mx-2" />
              </li>
              {!token?<> <li className="nav-item">
                <Link className="nav-link text-success fw-bold " to="login">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-success fw-bold " to="register">
                  Register
                </Link>
              </li></>: <li className="nav-item">
                <button className="nav-link nav-link text-danger fw-bold" onClick={logout}>
                  LogOut
                </button>
              </li>}
             
             
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
