import { useRouter } from "next/router";
import { useEffect, useState, useContext } from "react";
import UserContext from "../../Context/userContext";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
const BookDetail = () => {
  const { userid } = useContext(UserContext);
  let defaultDate = new Date();
  defaultDate.setDate(defaultDate.getDate() + 3);
  const [name, setName] = useState();
  const [mobile, setMobile] = useState();
  const [nationaId, setNationalId] = useState();
  const [date, setDate] = useState(defaultDate);
  const [checkOutBookDetail, setCheckOutBookDetail] = useState();
  const [validationError, setValidationError] = useState("");
  const [validateNationalId, setValidateNationalId] = useState("");
  const router = useRouter();
  const { id } = router.query;
  if (id === null) {
    router.push("/library");
  }
  function transform(e) {
    e.target.value = e.target.value
      .replace(/^(\d{2})$/g, "$1-")
      .replace(/^(\d{2}\-\d{3})$/g, "$1-");
    if (e.target.value.length > 14) {
      setValidationError("Phone Must Be 11 Characters For Pakistan");
    } else {
      setMobile(e.target.value);
      setValidationError("");
    }
  }
  const validateID = (e) => {
    if (e.target.value.length > 11) {
      setValidateNationalId("National Identity Must Be 11 Digits");
    } else {
      setNationalId(e.target.value);
      setValidateNationalId("");
    }
  };
  const submitCheckout = (e) => {
    e.preventDefault();
    if (name && mobile && nationaId && date !== "") {
      if (userid !== undefined) {
        axios
          .post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/checkout/${id}`, {
            UserID: userid,
            name: name,
            mobile: mobile,
            nationalId: nationaId,
            checkOutDate: date,
          })
          .then((res) => {
            toast.success("Successful Redirecting...")
            setName("")
            setMobile("")
            setNationalId("")
            setTimeout(()=>{
              location.href = "/library"
            },500)
          })
          .catch((err) => {toast.error("Something went wrong")});
      }
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

  return (
    <div className="full_page">
      <ToastContainer />
      <div className="container mt-5 h-100">
        <div className="card w-100 p-4">
          <h2 className="text-center">Check Out</h2>

          <div className="row mt-5">
            <div className="col-md-8">
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Your Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="ahmed@gmail.com"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="form-group mt-4">
                <label htmlFor="email" className="form-label">
                  Mobile number
                </label>
                <input
                  type="text"
                  onChange={transform}
                  placeholder="Mobile Number"
                  required
                  className="form-control"
                  value={mobile}
                />
                {validationError !== "" ? (
                  <span className="m-2 text-danger"> {validationError}</span>
                ) : null}
              </div>
              <div className="form-group mt-4">
                <label htmlFor="email" className="form-label">
                  National ID
                </label>
                <input
                  type="number"
                  value={nationaId}
                  className="form-control"
                  placeholder="11 Digits National Card Number"
                  onChange={validateID}
                />
                {validateNationalId !== "" ? (
                  <span className="m-2 text-danger"> {validateNationalId}</span>
                ) : null}
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
                value="Check out"
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
  );
};

export default BookDetail;
