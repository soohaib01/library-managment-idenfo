import Link from 'next/link'
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import UserContext from "../../Context/userContext";
import { useContext, useEffect, useState} from "react";
import {useRouter} from "next/router"
const Navbar = () => {
  const router = useRouter()
  const {userName,userSession} = useContext(UserContext)
  const [reUpdateComponent,setRepdateComponent] = useState()
  const destroySession = () => {
    toast.info("You Are Signing Out")
    localStorage.clear()
    userSession(false)
    router.push("/") 
  }
  useEffect(() => {
    setRepdateComponent(userName)
  },[userName])
  return (
    <div>
      <ToastContainer />
  <nav className="navbar navbar-expand-lg bg-light">
  <div className="container-fluid">
    <Link className="navbar-brand" href="/">Library Management <span className='text-primary'> (IDENFO TEST)</span></Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">  
      </ul>
      <div className="d-flex" role="search">
      <div className="dropdown mr-4">
  <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
    Hello
  </button>
  <ul className="dropdown-menu">
    <li><Link className="dropdown-item" href="/checkout/history">History</Link></li>
    <li><a className="dropdown-item" onClick={destroySession}>Sign Out</a></li>
 
  </ul>
</div>
      </div>
    </div>
  </div>
</nav>
    </div>
  )
}

export default Navbar