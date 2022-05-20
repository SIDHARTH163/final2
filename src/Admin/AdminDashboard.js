import React from 'react'

import { Link } from 'react-router-dom'
export default function AdminDashboard() {
  return (
    <div>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-md-4'>
            <Link to="/Free_uploads">Upload Free Apps</Link>
          </div>
          <div className='col-md-4'>
          <Link to="/Approve">Approve Apps</Link>
          </div>
          <div className='col-md-4'></div>
        </div>
      </div>
    </div>
  )
}
