import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import axios from "axios"
const BookDetail = () => {
  const router = useRouter()
  const [bookDetail,setBookDetail] = useState()
  const { slug } = router.query
  if(slug === null){
    router.push("/library")
  }
   
  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/books/${slug}`)
    .then((res) => {
      setBookDetail(res.data)
    }) 
    .catch((err) =>  console.log(err))
  },[slug])
  return(
    <>
     {bookDetail !== {} && bookDetail !== undefined ? (
           <div className='container'>
           <div className="card w-100 p-4 mt-4">
           <h3>Book Name</h3>
           <h5 class="card-title text-primary">{bookDetail.bookTitle}</h5>
           <hr />
           <h3>ISBN</h3>
           <h5 class="card-title text-primary">{bookDetail.Isbn}</h5>
           <hr />
           <h3>Publish Year</h3>
           <h5 class="card-title text-primary">{bookDetail.PublishYear}</h5>
           <hr />
            <h3>Price</h3>
           <h5 class="card-title text-primary">{bookDetail.CoverPrice}</h5>
           <hr />
       

   </div>
   </div>
     ) : (
      <h1>Loading</h1>
     )}
    </>
  )
}

export default BookDetail
