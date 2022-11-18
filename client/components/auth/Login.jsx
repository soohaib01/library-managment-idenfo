import Link from "next/link";
import axios from "axios";
import { useForm } from "react-hook-form";
import {useRouter} from "next/router";
import UserContext from "../../Context/userContext";
import { useContext , useState } from "react";
const Login = () => {
  const {isLoggedIn,userSession} = useContext(UserContext)
  const router = useRouter()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/login`,data).then((res) => {
     console.log(res.data)
      if(res.data.userId){
     userSession(true)
     router.push('/library')
     }
    })
    .catch((err) => console.log(err))
  };
  return (
    <div className="Login__page__container">
      <div className="card p-4" style={{ width: "25rem" }}>
        <div className="card-body text-center">
          <h3 className="text-center">Library Management</h3>``
        </div>
        <div className="row">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="col-md-12 mt-4">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                className="form-control"
                {...register("email", { required: true })}
              />
              {errors.emailrequired && (
                <span className="text-center mt-1 text-danger">
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
              />
              {errors.password && (
                <span className="text-center mt-1 text-danger">
                  Password is required
                </span>
              )}
            </div>

            <div className="col-md-12">
              <Link href="/library">Library</Link>
              <input type="submit" className="btn btn-primary w-100" />{" "}
            </div>
          </form>
          <div className="col-md-12 mt-4">
            <p>
              Don't Have An Account ?{" "}
              <Link
                className="text-primary stretched-llink"
                href="/auth/registration"
              >
                Register
              </Link>{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
