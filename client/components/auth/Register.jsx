import Link from "next/link";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import UserContext from "../../Context/userContext";
import { useContext, useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
const Register = () => {
  const { isLoggedIn, userSession } = useContext(UserContext);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    axios
      .post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/register`, data)
      .then((res) => {
        console.log(res.data);
        if (res.data.userId) {
          userSession(true);
          console.log(res.data)
          if (typeof window !== undefined) {
            localStorage.setItem("UserPublicId",res.data.userId);
            localStorage.setItem("UserPublicName",res.data.userName);
          }
          location.href = "/library"
        }
          else{
            toast.error("Beep Beep Invalid Details!")
          }
      })
      .catch((err) => console.log(err));
  };
 
  return (
    <div className="Login__page__container">
      <ToastContainer />
      <div className="card p-4" style={{ width: "25rem" }}>
        <div className="card-body text-center">
          <h3 className="text-center">Library Management <span className="text-primary">Register</span></h3>
        </div>
        <div className="row">
          <form onSubmit={handleSubmit(onSubmit)}>
          <div className="col-md-12">
              <label htmlFor="email" className="form-label">
                Full Name
              </label>
              <input
                className="form-control"
                {...register("name", { required: true })}
                placeholder="Ahmed Khan"
                
              />
              {errors.name && (
                <span className="text-center mt-2 text-danger">
                  Name is required
                </span>
              )}
            </div>
           
            <div className="col-md-12 mt-4">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                className="form-control"
                {...register("email", { required: true })}
                placeholder="name@example.com"
                
              />
              {errors.email && (
                <span className="text-center mt-2 text-danger">
                  Email is required
                </span>
              )}
            </div>
            <div className="col-md-12 mt-4">
              <label htmlFor="Password" className="form-label">
                Password
              </label>
              <input
                className="form-control"
                {...register("password", { required: true })}
                placeholder="********"
                type="password"
              />
              {errors.password && (
                <span className="text-center mt-2 text-danger">
                  Password is required
                </span>
              )}
            </div>

            <div className="col-md-12">
              <input type="submit" value="Sign up" className="btn btn-primary w-100 mt-4" />{" "}
            </div>
          </form>
          <div className="col-md-12 mt-4">
            <p>
              Already Have An Account ?{" "}
              <Link
                className="text-primary stretched-llink"
                href="/"
              >
                Login
              </Link>{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
