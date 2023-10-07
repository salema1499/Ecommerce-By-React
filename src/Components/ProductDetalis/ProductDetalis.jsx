import React, { useContext } from "react";
//import { useEffect } from 'react';
import axios from "axios";
import { Helmet } from "react-helmet";
import { toast } from 'react-hot-toast';
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import Slider from "react-slick";

import { cartContext } from "../Context/cartContext";

import "../../index.css";

export default function ProductDetalis() {
  var settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  let params = useParams();
  // console.log(params);
  let { data, isLoading } = useQuery("productDetalis", () =>
    getProductDetalis(params.id)
  );
  function getProductDetalis(id) {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  }
   //console.log(data?.data.data);

  //    async function getProductDetalis(id){
  //     let {data}= await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
  //     console.log(data);
  //   }
  //   useEffect(() => {
  //     getProductDetalis(params.id)

  //   }, []);
  let{AddToCart}=useContext(cartContext)
  async function addToCart(id){
    let res=await AddToCart(id)
   // console.log(data)
   if(res.data.status==="success"){
    toast.success('You Added Successfully ')

  }else{
    toast.error("This didn't add to your cart!!!!")

  }
  }
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{data?.data.data.title}</title>
        {/* <link rel="canonical" href="http://mysite.com/example" /> */}
      </Helmet>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-4 col-md-2 col-sm-12 ">
            <Slider {...settings}>
              {data?.data.data.images.map((img,i) => (
                <img key={i} src={img} alt={data?.data.data.title} className="w-100" />
              ))}
            </Slider>
          </div>
          <div className="col-lg-8 col-md-4 col-sm-12">
            <h2> {data?.data.data.title} </h2>
            <p> {data?.data.data.description} </p>
            <h5 className="text-success">
              {" "}
              Category: {data?.data.data.category.name}
            </h5>
            <h4 className="text-danger"> Price: {data?.data.data.price} EGP</h4>
            <div className="d-flex justify-content-between">
              <span> ratingsQuantity: {data?.data.data.ratingsQuantity}</span>
              <span>
                <i className="fa-solid fa-star text-warning" />{" "}
                {data?.data.data.ratingsAverage}
              </span>
            </div>
            <button onClick={()=>addToCart(data?.data.data.id)} className="w-100 btn btn-success text-center text-white p-2 my-3">
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
