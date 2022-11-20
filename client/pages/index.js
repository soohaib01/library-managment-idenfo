import Login from "../components/auth/Login";
import UserContext from "../Context/userContext";
import { useContext , useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
export default function Home() {
  const router = useRouter()
  const {isLoggedIn} = useContext(UserContext)
   useEffect(() => {
    if(isLoggedIn) {
      router.push('/library')
    }
    if(typeof window !== undefined && window.location !== undefined) {
      if(isLoggedIn === true){
        document.addEventListener("DOMContentLoaded", (e) => {
          window.location.href = "/library"
        })
      }
      }
   },[])
 
  return (
    <div>
      {isLoggedIn && (
        <>
        <h1 className="text-center mt-5">You are already logged in</h1>
         <p className="text-center mt-2">If you dont redirect automatically click below</p> 
      <p className="text-center">
      <Link className="btn btn-primary mt-2" href="/library">Bring me to library</Link>
        </p>  
        </>
      )}
      {!isLoggedIn && <Login />}
    </div>
  )
}
