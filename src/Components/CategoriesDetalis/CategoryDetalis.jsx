import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";
import toast from "react-hot-toast";
import { Link, useParams } from "react-router-dom";

import sorry from "../../Assets/Imgs/sorry.jpg";
import { authContext } from "../Context/authContext";
import { cartContext } from "../Context/cartContext";

import "../../index.css";
import style from "../FeatureProducts/FeaturProducts.module.css";

export default function CategoryDetalis() {
  const [isLoading, setIsLoading] = useState(false);
  const [catprods, setCatprods] = useState([]);
  const [isFound, setIsFound] = useState(false)
  // const [noneprods, setNoneprods] = useState(false)
  //    const [filtercat, setFiltercat] = useState([])

  let { filterProductcategery } = useContext(authContext);

  let { AddToCart } = useContext(cartContext);

  async function detalis(id) {
    let { data } = await filterProductcategery();
    // let filterme=data?.data.map((pro)=>pro.category)
    // console.log(data?.data);
    // console.log(filterme);
    // setFiltercat(filterme)//40 array of obj
    
    let date = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/categories/${id}`
    );
    //console.log(date?.data.data._id); //object 1 cat
    if(date?.data.data._id){
    let t = data?.data.filter((el) => el.category._id === date?.data.data._id);
    setCatprods(t);
    setIsFound(true)
    //console.log(t);
    setIsLoading(true);
    if(catprods.length===0){
      setIsFound(false)
       // console.log("goooooo")
    }
  }
   
  }
  let { id } = useParams();
  //console.log(id);

  useEffect(() => {
    detalis(id);
  }, []);

  async function addtocart(id) {
    let res = await AddToCart(id);
    if (res.data.status === "success") {
      toast.success("You Added Successfully ");
    } else {
      toast.error("This didn't add to your cart!!!!");
    }
  }

  return (
    <>
      {isLoading ? (
       <>
       
       
        <div className="container">
          <div className="row">
                {catprods.map((product) => (
                  <div
                    className={`${style.product} col-lg-2 col-md-4 col-sm-12 overflow-hidden`}
                    key={product.id}
                  >
                    <Helmet>
                      <meta charSet="utf-8" />
                      <title>{product.category.name} </title>
                    </Helmet>
                    <div className="p-1">
                      <Link to={`/productdetalis/${product.id}`}>
                        <img
                          className={` w-100`}
                          src={product.imageCover}
                          alt={product.title}
                        />
                        <span className="h6 text-success font-sm fw-bold">
                          {product.category.name}
                        </span>
                        <h2 className="h6 text-dark">
                          {product.title.split(" ").slice(0, 2).join(" ")}
                        </h2>
                        <div className="d-flex justify-content-between p-2">
                          <span>
                            {" "}
                            <span className="text-danger">
                              {" "}
                              {product.price}{" "}
                            </span>{" "}
                            EGP
                          </span>
                          <span>
                            {" "}
                            <i className="fa-solid fa-star text-warning" />{" "}
                            {product.ratingsAverage}{" "}
                          </span>
                        </div>
                      </Link>
                      <button
                        onClick={() => addtocart(product.id)}
                        className={`${style.btn} btn btn-success text-white w-100 text-center p-1 `}
                      >
                        add to cart
                      </button>
                    </div>
                 </div>
                ))}
          </div>  
        </div>
        {!isFound?<>
          <div className="container">
            <div className="text-center text-white bg-success rounded-3">
              <img src={sorry} alt="sorryImg" className="w-25 m-5 p-3 m-auto rounded-circle"/>
              <h3 className="m-2 p-3">Sorry this Category don't find any Products</h3>
            </div>
          </div>
        </>:""}
       </>
       
      
      
      ) : (
        <div className="text-center">
          <button
            type="button"
            className="btn btn-btn-outline-success fs-1 fw-bolder mt-5 text-success my-5"
          >
            <i className="fas fa-spinner fa-spin"></i>
          </button>
        </div>
      )}
    </>
  );
}
