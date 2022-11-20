import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css';

const Dashboard = ({books}) => {

  return (
    <>
  
    <div className='container mt-5'>
      {books !== undefined ? <>
        <div className='row'>
      {books.map((item,index)=>(
      
  <div className='col-md-4 mt-4' key={item+index}>
   <div className="card">
  <div className="card-body">
  <div className="row">
    <div className="col-md-9"><span className="badge text-bg-success">#{item.Isbn}</span></div>
    <div className="col-md-3">
      <Link href={`/bookDetails/${item._id}`}>Details</Link>
    </div>
  </div>
      <h5 className="card-title mt-1">{item.bookTitle}</h5>
    <h6>Publish Year : {item.PublishYear}</h6>
    <p className="card-text">PKR {item.CoverPrice}</p>
    <Link className='btn btn-primary' href={`bookCheckin/${item._id}`}>
      Check in
      </Link>     
      <Link className='btn btn-success mx-1' href={`bookCheckout/${item._id}`}>
      Check Out
      </Link>   
  </div>
</div>

  </div>
          
      ))}
       </div>
      </> : <>
      <Skeleton count={5} height={200} />

      </>}
     
    </div>
    </>
  )
}


export default Dashboard