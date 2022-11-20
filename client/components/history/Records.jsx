import axios from "axios";
import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import UserContext from "../../Context/userContext";
import { useContext } from "react";
const Records = ({ data }) => {
  const [records, setRecords] = useState({});
  const { userid } = useContext(UserContext);

  useEffect(() => {
    if (userid !== undefined) {
      axios
        .get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/getMe/${userid}`)
        .then((res) => {
          setRecords(res.data);
          console.log(records);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  return (
    <div className="container">
      <div className="card w-100 p-4 mt-4">
        <h2 className="font-weight-bold mb-4">Check In History</h2>
        <div className="row">
          {records !== {} ? (
            <div>
              {records.checkInBooks !== undefined &&
                records.checkInBooks.map((i) => (
                  <>
                    <div class="accordion" id="accordionExample">
                      <div class="accordion-item">
                        <h2 class="accordion-header" id="headingOne">
                          <button
                            class="accordion-button"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseOne"
                            aria-expanded="true"
                            aria-controls="collapseOne"
                          >
                            <span class="badge rounded-pill text-bg-success">
                              {" "}
                              {i}
                            </span>
                          </button>
                        </h2>
                        <div
                          id="collapseOne"
                          class="accordion-collapse collapse show"
                          aria-labelledby="headingOne"
                          data-bs-parent="#accordionExample"
                        >
                          <div class="accordion-body">
                            <strong>
                              User ID{" "}
                              <span className="text-primary mx-2">
                                {records._id}
                              </span>{" "}
                            </strong>{" "}
                            <br />
                            <strong>
                              Your Name:{" "}
                              <span className="text-primary mx-2 mt-2">
                                {records.name}
                              </span>{" "}
                            </strong>{" "}
                            <br />
                            <strong>
                              Email:{" "}
                              <span className="text-primary mx-2 mt-2">
                                {records.email}
                              </span>{" "}
                            </strong>{" "}
                            <br />
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ))}
            </div>
          ) : (
            <Skeleton></Skeleton>
          )}
        </div>
      </div>

      <div className="card w-100 p-4 mt-4">
        <h2 className="font-weight-bold mb-4">Check Out History</h2>
        <div className="row">
          {records !== {} ? (
            <div>
              {records.checkInBooks !== undefined &&
                records.checkOutBooks.map((i) => (
                  <>
                    <div class="accordion" id="accordionExample">
                      <div class="accordion-item">
                        <h2 class="accordion-header" id="headingOne">
                          <button
                            class="accordion-button"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseOne"
                            aria-expanded="true"
                            aria-controls="collapseOne"
                          >
                            <span class="badge rounded-pill text-bg-success">
                              {" "}
                              {i}
                            </span>
                          </button>
                        </h2>
                        <div
                          id="collapseOne"
                          class="accordion-collapse collapse show"
                          aria-labelledby="headingOne"
                          data-bs-parent="#accordionExample"
                        >
                          <div class="accordion-body">
                            <strong>
                              User ID{" "}
                              <span className="text-primary mx-2">
                                {records._id}
                              </span>{" "}
                            </strong>{" "}
                            <br />
                            <strong>
                              Your Name:{" "}
                              <span className="text-primary mx-2 mt-2">
                                {records.name}
                              </span>{" "}
                            </strong>{" "}
                            <br />
                            <strong>
                              Email:{" "}
                              <span className="text-primary mx-2 mt-2">
                                {records.email}
                              </span>{" "}
                            </strong>{" "}
                            <br />
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ))}
            </div>
          ) : (
            <Skeleton></Skeleton>
          )}
        </div>
      </div>
    </div>
  );
};

export default Records;
