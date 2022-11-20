import { useRouter } from "next/router";
import { useEffect, useState, useContext } from "react";
import UserContext from "../../Context/userContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Link from "next/link";
const BookDetail = () => {
  const { userid } = useContext(UserContext);
  const [isBookCheckedOut,setIsBookCheckedOut] = useState();
  let defaultDate = new Date();
  defaultDate.setDate(defaultDate.getDate() + 3);
  const [name, setName] = useState();
  const [date, setDate] = useState(defaultDate);
  const [checkOutBookDetail, setCheckOutBookDetail] = useState();

  const router = useRouter();
  const { id } = router.query;
  if (id === null) {
    router.push("/library");
  }
 
  const submitCheckout = (e) => {
    e.preventDefault();
    if(typeof window !== undefined){
      axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/checkinBooks/${id}`, {
        userId: userid
      }).then((res) => {
        toast.success("Check in complete")
        setTimeout(() => {
          location.href= "/library"
        },500)
      })
    }
  };
  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/books/${id}`)
      .then((res) => {
        setCheckOutBookDetail(res.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  useEffect(() => {
    if(typeof window !== undefined){
      const userId = localStorage.getItem("UserPublicId")
      axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/getMe/${userId}`).then((res) => {
        setIsBookCheckedOut(res.data)
        setName(res.data.name)

    }).catch((err) =>  console.log(err)) 
  }
  },[id])
  if(isBookCheckedOut !== undefined && isBookCheckedOut.checkOutBooks.find(ele => ele !== id)){
  return (
    <>
        <div className="container">
      <div className="card mt-5 p-4 w-100">
        <h1 className="text-center mt-2 text-danger">Book Already Checked in</h1>
        <p className="text-center mt-2 font-bold"> Please check Out first</p>
          <Link className="btn btn-primary" href="/library">Go to library</Link> 
      </div>
    </div>
    </>
  )
  
  }
  return (
    <>
    <div className="full_page">
      <ToastContainer />
      <div className="container mt-5 h-100">
        <div className="card w-100 p-4">
          <h2 className="text-center">Check In</h2>

          <div className="row mt-5">
            <div className="col-md-8">
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Your Name
                </label>
                <input
                  type="text"
                  readOnly={true}
                  className="form-control"
                  placeholder="ahmed@gmail.com"
                  value={name}
                />
              </div>
              <div className="form-group mt-4">
                <label htmlFor="email" className="form-label">
                  Checkout Date
                </label>
                <input
                  type="date"
                  value={date.toLocaleDateString("en-CA")}
                  className="form-control disabled"
                  readOnly={true}
                />{" "}
              </div>
              <input
                type="submit"
                className="btn btn-primary w-100 mt-4"
                value="Check In"
                onClick={submitCheckout}
              />
            </div>
            <div className="col-md-4">
              <h6>Book Details</h6>
              <div className="row">
                <div className="col-md-12">
                  <div className="card p-2 px-2">
                    <div className="row">
                      <div className="col-md-7">
                        <h5 className="text-secondary">Book Name</h5>
                      </div>
                      <div className="col-md-5">
                        {checkOutBookDetail !== {} &&
                        checkOutBookDetail !== undefined ? (
                          <strong className="text-primary">
                            {checkOutBookDetail.bookTitle}
                          </strong>
                        ) : (
                          <strong>Loading</strong>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-12 mt-5">
                  <div className="card p-2">
                    <div className="row">
                      <div className="col-md-7">
                        <h5 className="text-secondary">#ISBN</h5>
                      </div>
                      <div className="col-md-5">
                        {checkOutBookDetail !== {} &&
                        checkOutBookDetail !== undefined ? (
                          <strong className="text-primary">
                            {checkOutBookDetail.Isbn}
                          </strong>
                        ) : (
                          <strong>Loading</strong>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-12 mt-5">
                  <div className="card p-2">
                    <div className="row">
                      <div className="col-md-7">
                        <h5 className="text-secondary">Publish Year</h5>
                      </div>
                      <div className="col-md-5">
                        {checkOutBookDetail !== {} &&
                        checkOutBookDetail !== undefined ? (
                          <strong className="text-primary">
                            {checkOutBookDetail.PublishYear}
                          </strong>
                        ) : (
                          <strong>Loading</strong>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-12 mt-5">
                  <div className="card p-2">
                    <div className="row">
                      <div className="col-md-7">
                        <h5 className="text-secondary">Price</h5>
                      </div>
                      <div className="col-md-5">
                        {checkOutBookDetail !== {} &&
                        checkOutBookDetail !== undefined ? (
                          <strong className="text-primary">
                            PKR / {checkOutBookDetail.CoverPrice}
                          </strong>
                        ) : (
                          <strong>Loading</strong>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default BookDetail;
