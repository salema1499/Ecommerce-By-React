import React from 'react'
import axios from 'axios'
import { useQuery } from 'react-query'
import Slider from "react-slick";

import style from './CategorySliders.module.css'

export default function CategorySliders() {
    var settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        autoplay:true,
        slidesToShow: 5,
        slidesToScroll: 1
      };
    let {data}=useQuery('categoryslide',categorySlider)
    function categorySlider(){
      return axios.get('https://ecommerce.routemisr.com/api/v1/categories')
    }
    //console.log(data?.data.data);
  return (
    <>
    <div className='container-fluid'>
     <div className='parentdiv'>
      {data?.data.data? 
        <Slider {...settings}>
          {data?.data.data.map((cat,i)=>
            <figure key={i}>
                <img className={`${style.img}`} src={cat.image} alt={cat.name} />
                <figcaption className='text-success text-center'>{cat.name}</figcaption>
            </figure>
          )}
       
         </Slider>:""}
       </div>  
       </div>
    </>
  )
}
