import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
const Dashboard = ({books}) => {
  console.log(books)
  return (
    <div className='container mt-5'>
      {books !== undefined ? <>
        <div className='row'>
      {books.map((item,index)=>(
  
  <div className='col-md-4 mt-4' key={item+index}>
   <div className="card">

  <div className="card-body">
  <span className="badge text-bg-success">#{item.Isbn}</span>
      <h5 className="card-title mt-1">{item.bookTitle}</h5>
    <h6>Publish Year : {item.PublishYear}</h6>
    <p className="card-text">PKR {item.CoverPrice}</p>
   {item.checkIn === true ? (
   <>
   <a href="#" className="btn btn-primary">Check In</a>
   <a href="#" className="btn btn-primary mx-4">CheckOut</a></>
   ):(
    <>
    <a href="#" className="btn btn-primary">Check In</a>
   <a href="#" className="btn btn-primary mx-4 disabled">CheckOut</a></>
   )}
 
  </div>
</div>

  </div>

      ))}
       </div>
      </> : <>
      <Skeleton count={5} />
      </>}
     
    </div>
  )
}


export default Dashboard