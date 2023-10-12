import React, { useEffect, useState } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";
import { Link, useParams } from "react-router-dom";

import style from './Categories.module.css'

export default function Categories() {
  const [allCate, setAllCate] = useState([]);

  async function getallCategory() {
    let data  = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/categories"
    );
    //console.log(data.data.data);
    

    setAllCate(data?.data.data);
  }
  let params=  useParams()
//console.log(params)

  useEffect(() => {
    getallCategory();
  }, []);

  return (
    <>
       <Helmet>
                <meta charSet="utf-8" />
                <title>Categories</title>
        </Helmet>
       <div className="container">
       <h1 className="text-success text-center mb-5">Our Categories</h1>
        <div className="row ">
          {allCate.map((one) => {
            return (
              <>
                <div className="col-lg-3 col-md-6 col-sm-12 mb-2">
                  <Link to={`/categoriesdetalis/${one._id}`}>
                  <div className="text-center">
                  <img
                      className={`w-50 rounded-circle mb-2 ${style.img}`}
                      height={200}
                      src={one.image}
                      alt=""
                      
                    />
                  </div>
                    
                    <h5 className="text-success text-center mt-2">
                      {one.name}
                    </h5>
                  </Link>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </> 
  );
}
