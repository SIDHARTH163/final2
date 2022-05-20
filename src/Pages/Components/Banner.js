import React from 'react'
import './Banner.css'
import logo from './logo.png'
export default function Banner() {
  return (
    <div className='container my-2'>
         <div className="p-5 mb-4 bg-light rounded-3 banner">
      <div className="container-fluid p-3">
         
        <h1 className="display-5 fw-bold text-white large"> <img className='mb-2' alt='logo' width="38" height="38" src={logo}></img> Abtaran App Store</h1>
        <p className="col-md-8 fs-5 fw-bold text-white small">Sailing Towards Growth.</p>
       
      </div>
    </div>
    </div>
  )
}
