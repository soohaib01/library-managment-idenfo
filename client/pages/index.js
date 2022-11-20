import Login from "../components/auth/Login";
import UserContext from "../Context/userContext";
import { useContext , useEffect, useState } from "react";
import { useRouter } from "next/router";
export default function Home() {
  const router = useRouter()
  const {isLoggedIn} = useContext(UserContext)
   useEffect(() => {
    if(isLoggedIn) {
      router.push('/library')
    }
    if(typeof window !== undefined && window.location !== undefined) {
      if(isLoggedIn === true){
        document.addEventListener("load", () => {
          location.href = "/library"
        })
      }
      }
   },[])
 
  return (
    <div>
      {isLoggedIn && <h1 className="text-center mt-5">You are already logged in</h1>}
      {!isLoggedIn && <Login />}
    </div>
  )
}
