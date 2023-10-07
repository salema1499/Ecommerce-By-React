import React from 'react';
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import ReactDOM from 'react-dom/client';
import { QueryClientProvider ,QueryClient } from 'react-query';

//import  AuthProvider from './Components/Context/authContext'
import App from './App';
import reportWebVitals from './reportWebVitals';

import './index.css';
import '@fortawesome/fontawesome-free/css/all.min.css'
import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

const root = ReactDOM.createRoot(document.getElementById('root'));
let queryClinet=new QueryClient()
root.render(

  <QueryClientProvider client={queryClinet}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </QueryClientProvider> 

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
