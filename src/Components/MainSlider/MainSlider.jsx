import React from "react";
import Slider from "react-slick";

import blog1 from "../../Assets/Imgs/grocery-banner-2.jpeg";
import blog2 from "../../Assets/Imgs/grocery-banner.png";
import slider1 from "../../Assets/Imgs/slider-image-1.jpeg";
import slider2 from "../../Assets/Imgs/slider-image-2.jpeg";
import slider3 from "../../Assets/Imgs/slider-image-3.jpeg";

export default function MainSlider() {
  var settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 1000,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <>
      <div className=" mt-3 mb-5 parentdiv mt-5">
        <div className="row gx-0">
          <div className="col-lg-9 ">
            <Slider {...settings}>
              <img className="w-100" height={300} src={slider1} alt="" />
              <img className="w-100" height={300} src={slider2} alt="" />
              <img className="w-100" height={300} src={slider3} alt="" />
            </Slider>
          </div>
          <div className="col-lg-3 ">
            <img className="w-100" height={150} src={blog1} alt="" />
            <img className="w-100" height={150} src={blog2} alt="" />
          </div>
        </div>
      </div>
    </>
  );
}
