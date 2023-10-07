import React from 'react'
import {Helmet} from "react-helmet";

import FeatureProducts from '../FeatureProducts/FeatureProducts'
import CategorySliders from '../CategorySliders/CategorySliders'
import MainSlider from '../MainSlider/MainSlider'

export default function Home() {

  return (
   <>
      <Helmet>
                <meta charSet="utf-8" />
                <title>FreshCart</title>
                {/* <link rel="canonical" href="http://mysite.com/example" /> */}
      </Helmet>
      <MainSlider/>
      <CategorySliders/>
      <FeatureProducts/>

   </>
  )
}
