import React from 'react'
import Dashboard from '../../components/dashboard'
import UserContext from "../../Context/userContext";
import { useContext , useState } from "react";
import { useRouter } from 'next/router';
const Library = ({data}) => {
  const router = useRouter()
  const {isLoggedIn} = useContext(UserContext)
  if(isLoggedIn === false){
    router.push("/")
  }
  return (
    <div>
    
        <Dashboard books={data} />
    </div>
  )
}

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/books`)
  const data = await res.json()
 console.log(data)
  // Pass data to the page via props
  return { props: { data } }
}
export default Library