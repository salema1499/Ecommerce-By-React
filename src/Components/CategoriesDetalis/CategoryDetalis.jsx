import React, { useContext,useEffect,useState } from "react";
import axios from "axios";
import { Helmet } from 'react-helmet';
import toast from "react-hot-toast";
import { Link, useParams } from "react-router-dom";

import sorry from '../../Assets/Imgs/sorry.jpg'
import { cartContext } from "../Context/cartContext";

import "../../index.css";
import style from "../FeatureProducts/FeaturProducts.module.css";

export default function CategoryDetalis() {
   const [isLoading, setIsLoading] = useState(false)
   const [catprods, setCatprods] = useState([])
  const [noneprods, setNoneprods] = useState(false)
    async function detalis(id){
      setIsLoading(true)
        let date=await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}`)
        console.log(date?.data.data);
        setIsLoading(false)
        setCatprods(date?.data.data.name)
        if(date?.data.data.name==="Men's Fashion"){
         
            setCatprods(JSON.parse(localStorage.getItem('men')))
            setNoneprods(true)
           
        }else if(date?.data.data.name==="Women's Fashion"){
         
          setCatprods(JSON.parse(localStorage.getItem('woman')))
          setNoneprods(true)
         
        }else if(date?.data.data.name==="Electronics"){
         
          setCatprods(JSON.parse(localStorage.getItem('elec')))
          setNoneprods(true)
         
        }
        console.log(catprods);
    }
    let {id}=useParams()
    console.log(id)

    useEffect(() => {
       detalis(id)
    }, []);
    
  let { AddToCart } = useContext(cartContext);

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
    {!isLoading ?
         
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
          {noneprods?<>
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
          </>:<>
              <div className="text-white m-auto text-center bg-success d-flex flex-column justify-content-center align-items-center vh-100 rounded-pill"> 
              <img src={sorry} alt="" className="w-25 rounded-circle mb-5"/>
              <h2 className="fs-2  lh-lg ">
              Sorry, there are no products here
               If you want products, you can see category<br/> <span className="text-info">Men's Fashion</span> or <span className="text-info">Women's Fashion</span> or <span className="text-info">Electronics</span> 
              </h2>
              </div>
          </>}
            
          </div>
        </div>:
        <div className="text-center">
          <button
            type="button"
            className="btn btn-btn-outline-success fs-1 fw-bolder mt-5 text-success my-5"
          >
            <i className="fas fa-spinner fa-spin"></i>
          </button>
        </div>}
      
      
    </>
  )
}



