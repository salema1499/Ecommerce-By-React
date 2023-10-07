import React from 'react'
import { Link } from 'react-router-dom'

import style from './Footer.module.css'

export default function Footer() {
  return (
    <>
     <>{ /* Footer */ }
<footer className={`page-footer font-small cyan darken-3 ${style.footerbg}`}>

  { /* Footer Elements */ }
  <div className="container">

    { /* Grid row*/ }
    <div className="row">

      { /* Grid column */ }
      <div className="col-md-12 py-3">
        <div className="text-center flex-center">

          { /* Facebook */ }
          <Link to="" className="fb-ic">
            <i className="fab fa-facebook-f fa-lg text-success m-auto text-center fa-2x p-2 fs-3"> </i>
          </Link>
          { /* Twitter */ }
          <Link to="" className="tw-ic">
            <i className="fab fa-twitter fa-lg text-success m-auto text-center fa-2x p-2 fs-3"> </i>
          </Link>
          { /* Google +*/ }
          <Link to="" className="gplus-ic">
            <i className="fab fa-google-plus-g fa-lg text-success m-auto text-center fa-2x p-2 fs-3"> </i>
          </Link>
          { /*Linkedin */ }
          <Link to="" className="li-ic">
            <i className="fab fa-linkedin-in fa-lg text-success m-auto text-center fa-2x p-2 fs-3"> </i>
          </Link>
          { /*Instagram*/ }
          <Link to="" className="ins-ic">
            <i className="fab fa-instagram fa-lg text-success m-auto text-center fa-2x p-2 fs-3"> </i>
          </Link>
          { /*Pinterest*/ }
          <Link to="" className="pin-ic">
            <i className="fab fa-pinterest fa-lg text-success m-auto fa-2x p-2 fs-3"> </i>
          </Link>
        </div>
      </div>
      { /* Grid column */ }

    </div>
    { /* Grid row*/ }

  </div>
  { /* Footer Elements */ }

  { /* Copyright */ }
  <div className="footer-copyright text-center py-3">© 2020 Copyright:
    <Link to='' href="" className='text-danger'> FreshCart.com</Link>
  </div>
  { /* Copyright */ }

</footer>
{ /* Footer */ }</>
    </>
  )
}
