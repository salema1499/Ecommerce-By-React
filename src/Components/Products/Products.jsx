import React from 'react'
import { Helmet } from 'react-helmet';

import FeatureProducts from './../FeatureProducts/FeatureProducts';

export default function Products() {
  return (
    <>
     <Helmet>
                <meta charSet="utf-8" />
                <title>Products </title>
        </Helmet>
      <FeatureProducts/>
    </>
  )
}
