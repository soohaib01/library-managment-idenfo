import Link from 'next/link'
import React, { useEffect } from 'react'
import axios from 'axios'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
const Dashboard = ({books}) => {
  useEffect(() => {
    const userId = localStorage.getItem("UserPublicId")
    axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/getMe/${userId}`).then((res) => {
      console.log("REsponse for a user",res)
    }).catch((err) =>  console.log(err))
  },[])

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
    <Link href={`/bookCheckout/${item._id}`} className="btn btn-primary">Check In</Link>
   <Link href={`/bookCheckout/${item._id}`} className="btn btn-success mx-2">CheckOut</Link>
 
  </div>
</div>

  </div>

      ))}
       </div>
      </> : <>
      <Skeleton count={5} />
      </>}
     
    </div>
    </>
  )
}


export default Dashboard