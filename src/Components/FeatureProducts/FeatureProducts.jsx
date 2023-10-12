import React, { useContext, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";

import { cartContext } from "../Context/cartContext";

import "../../index.css";
//import  axios  from 'axios';
import style from "./FeaturProducts.module.css";

export default function FeatureProducts() {
  //const [filtercat, setFiltercat] = useState([]);
  let { data, isLoading } = useQuery("featureProducts", featureProduct, {
    ///enabled: false,
  });
  console.log(isLoading);
  //const [number, setnumber] = useState(0)
  const [loading, setLoading] = useState(false);
  //const [loadingblock, setLoadingblock] = useState(false);
 // const [loadingnone, setLoadingnone] = useState("d-none");
  // let Women = data?.data.data.filter(function (el) {
  //   return el?.category.name === "Women's Fashion";
  // });
  // localStorage.setItem("woman", JSON.stringify(Women));
  // //Women?.map((one) => console.log(one));

  // let men = data?.data.data.filter(function (el) {
  //   return el?.category.name === "Men's Fashion";
  // });
  // localStorage.setItem("men", JSON.stringify(men));
  // // men?.map((one) => console.log(one));

  // let elec = data?.data.data.filter(function (el) {
  //   return el?.category.name === "Electronics";
  // });
  // localStorage.setItem("elec", JSON.stringify(elec));
  // // elec?.map((one) => console.log(one));

  function featureProduct() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }

  let { AddToCart } = useContext(cartContext);
   
  async function addtocart(id) {
    let res = await AddToCart(id);
    setLoading(true);
    // setLoadingnone('d-block')
    //setLoadingblock(true);
    console.log(res);

    if (res.data.status === "success") {
      setLoading(false);

      toast.success("You Added Successfully ");
    } else {
      toast.error("This didn't add to your cart!!!!");
    }
  }

  // function checkAdd(proId){
    
  //   for (let prId = 0; prId < proId; prId++) {
  //    if(loading){
  //      setLoading(false)
  //    }    
  //   }

     
  // }

  //console.log(data?.data.data);
  // const [isLoading, setIsLoading] = useState(false);
  // const [products, setProducts] = useState([])
  //  async function featureProduct(){
  //     setIsLoading(true)
  //     let feature= await axios.get('https://ecommerce.routemisr.com/api/v1/products');

  //     setProducts(feature.data.data)
  //     setIsLoading(false)
  //  }

  //  useEffect(() => {

  //     featureProduct()

  //  }, []);
  return (
    <>
      {!isLoading ? (
        <div className="container">
          {/* <div className=" text-center p-2 m-3">
            <button
              onClick={() => refetch()}
              className="w-75 btn btn-success text-center text-white p-2"
            >
              GET PRODUCTS
            </button>
          </div> */}
          <div className="row">
            {data?.data.data.map((product) => (
             
              <div
                className={`${style.product} col-lg-2 col-md-4 col-sm-12 overflow-hidden`}
                key={product.id}
              >
               
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
                    className={`${style.btn} btn btn-success  text-white w-100 text-center p-1 `}
                  >
                  
                      add to cart 
                  </button>

                  {/* <button
                    onClick={() => addtocart(product.id)}
                    className={`${style.btn} btn btn-success  text-white w-100 text-center p-1 `}
                  >
                   {loadingnone?"inCart":<></>}
                  </button> */}
                  {/* <button
                    onClick={() => addtocart(product.id)}
                    className={`${style.btn}  ${loading} btn btn-success text-white w-100 text-center p-1 `}
                  >
                  in Cart
                  </button> */}
                </div>
              </div>
            ))}
          </div>
        </div>
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
