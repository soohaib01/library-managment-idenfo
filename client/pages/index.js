import Login from "../components/auth/Login";
import UserContext from "../Context/userContext";
import { useContext , useState } from "react";
import { useRouter } from "next/router";
export default function Home() {
  const router = useRouter()
  const {isLoggedIn} = useContext(UserContext)
   if(isLoggedIn) {
   router.push("/library")
   }
  return (
    <div>
      {isLoggedIn && <h1 className="text-center mt-5">You are already logged in</h1>}
      {!isLoggedIn && <Login />}
    </div>
  )
}
