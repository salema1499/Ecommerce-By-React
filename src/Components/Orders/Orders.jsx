import React, { useContext, useEffect, useState } from "react";
import jwtDecode from "jwt-decode";

import { cartContext } from "../Context/cartContext";

export default function Orders() {
  const [dataOrder, setdataOrder] = useState([]);
  let enCode=localStorage.getItem("token")
  let deCode=jwtDecode(enCode)
  //console.log(deCode.id);
  let { getUserOrder } = useContext(cartContext);
  async function getorder(id) {
    // let enCode=localStorage.getItem("token")
    // let deCode=jwtDecode(enCode)
    // console.log(deCode);
    let res = await getUserOrder(id);
    //console.log("myorder", res.data);
    setdataOrder(res?.data)
  }

  useEffect(() => {
    getorder(deCode.id);
  }, []);
  return <>

    <div className="container">
      <div className="row">
         <h1 className="text-center text-success p-2 m-2">Your Orders </h1>
         {dataOrder.map((el)=>{
            return <>
            <div className="row bg-success p-2 m-2 rounded-2 w-100 text-white">
            <h4 className="text-center p-2 m-2 ">Ur Order at :<span className="text-warning">{el.createdAt}</span></h4>
                        {el.cartItems.map((ell)=>{
                          return <>
                
                                <div className={` col-lg-2 col-md-4 col-sm-12 overflow-hidden text-center`}
                                    key={ell.product.id}>
                                    <div className="p-1">
                                      <div>
                                        <img
                                          className={` w-100 rounded-2`}
                                          src={ell.product.imageCover}
                                          alt={ell.product.title}
                                        />
                                        <span className="h6 text-success font-sm fw-bold">
                                          {ell.product.category.name}
                                        </span>
                                        <h2 className="h6 text-white">
                                          {ell.product.title.split(" ").slice(0, 2).join(" ")}
                                        </h2>
                                        <div className="d-flex justify-content-between p-2">
                                          <span>
                                            {" "}
                                            <span className="text-danger">
                                              {" "}
                                              {ell.product.price}{" "}
                                            </span>{" "}
                                            EGP
                                          </span>
                                          <span>
                                            {" "}
                                            <i className="fa-solid fa-star text-warning" />{" "}
                                            {ell.product.ratingsAverage}{" "}
                                          </span>
                                        </div>
                                      </div>
                                      

                                      
                                    </div>
                                </div>

                            </> })}
            
                   </div>
                   </>
        
         })}
        
       
      </div>
    </div>
  </>
}
