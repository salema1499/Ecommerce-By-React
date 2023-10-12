import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';

import Address from './../Address/Address';
import emptycart from "../../Assets/Imgs/empty-cart_701961-7086.avif";
import { cartContext } from "../Context/cartContext";

import "../../index.css";

export default function Cart() {
  const [numitemscart, setNumitemscart] = useState(0);
  const [totalprice, setTotalprice] = useState(0);
  const [displayCartme, setDisplayCartme] = useState([]);

  let { displayCart, updataCountCart, removeItemCart, removeAllCart } =
    useContext(cartContext);

  async function displaymycart() {
    let data = await displayCart();
    // console.log(data);
    // console.log(data?.data);

    if (data?.data) {
      setDisplayCartme(data?.data.data.products);
      setNumitemscart(data?.data.numOfCartItems);
      setTotalprice(data?.data.data.totalCartPrice);
    } else {
      setDisplayCartme();
      setNumitemscart(0);
      setTotalprice(0);
    }
  }
  useEffect(() => {
    displaymycart();
   // console.log(displayCartme);
  }, []);

  async function updataMyCart(id, count) {
    let data = await updataCountCart(id, count);
    //console.log(data?.data);
    setDisplayCartme(data?.data.data.products);
    setNumitemscart(data?.data.numOfCartItems);
    setTotalprice(data?.data.data.totalCartPrice);
  }

  async function removeItem(id) {
    let { data } = await removeItemCart(id);
   // console.log(data?.data.totalCartPrice);
    setNumitemscart(data?.numOfCartItems);
    setTotalprice(data?.data.totalCartPrice);
    setDisplayCartme(data?.data.products);
  }
  async function removeAllItemsCart() {
    let all = await removeAllCart();
   // console.log(all);
    setDisplayCartme(null);
    setNumitemscart(0);
    setTotalprice(0);
  }

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Cart </title>
      </Helmet>
      {displayCartme ? (
        <>
          <div className=" text-info container mt-2 text-center d-flex justify-content-around">
            <h3>Ur Cart :)</h3>
            <h5 className="text-success">
              Num Of Cart Items :{" "}
              <span className="text-danger">{numitemscart}</span>
            </h5>
          </div>
          {displayCartme.map((one, i) => {
            return (
              <>
                <div className="container ">
                  <div className=" p-0 ">
                    <div
                      key={one.product.id}
                      className="row  align-items-center shadoow text-center m-auto "
                    >
                      <div className="col-lg-4 col-md-3 col-sm-12">
                        <img
                          className="w-50 shadoow m-2 rounded-2"
                          src={one.product.imageCover}
                          alt=""
                        />
                      </div>

                      <div className="col-lg-4 col-md-3 col-sm-12">
                        <h4>{one.product.title}</h4>
                        <h6>
                          Price :{" "}
                          <span className="text-danger">{one.price}</span>
                        </h6>
                        <span>
                          <i className="fa-solid fa-star text-warning" />{" "}
                          {one.product.ratingsAverage}
                        </span>
                      </div>
                     
                      <div className="col-lg-4 col-md-3 col-sm-12">
                        <div className="text-center">
                          <button
                            onClick={() =>
                              updataMyCart(one.product.id, one.count + 1)
                            }
                            className="btn btn-info m-1"
                          >
                            +
                          </button>
                          {one.count}
                          <button
                            onClick={() =>
                              updataMyCart(one.product.id, one.count - 1)
                            }
                            className="btn btn-info m-1"
                          >
                            -
                          </button>
                        </div>

                        <button
                          onClick={() => removeItem(one.product.id)}
                          className="btn btn-danger p-2 w-50 text-center m-1"
                        >
                          Remove
                        </button>
                      </div>
                      <div className="offset-3"></div>
                    </div>
                  </div>
                </div>
              </>
            );
          })}

          <div className="text-success pt-5 text-center m-auto    d-flex justify-content-around">
            <h5>
              Totle Price :<span className="text-danger"> {totalprice}</span>
            </h5>
            <button
              onClick={removeAllItemsCart}
              className="btn btn-danger px-3"
            >
              Remove All
            </button>
          </div>
          <div className=" container d-flex justify-content-between align-content-center">
           <button className="btn btn-success text-white m-2 p-2 text-center w-25"><Link to="/address"> Online Payment</Link></button>
            <button className="btn btn-success text-white m-2 p-2 text-center w-25">Cash On Delivery</button>
         
          </div>
        </>
      ) : (
        <div className="text-white bg-success text-center m-auto mt-5 hv-100 rounded-5  container">
          <h2>Your Cart Is Empty !!</h2>
          <img
            className="w-50 m-4 text-center rounded-circle"
            src={emptycart}
            alt=""
          />
        </div>
      )}
    </>
  );
}
