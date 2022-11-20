import Router, { useRouter } from "next/router"

export default function Custom404() {
  const router = useRouter()
    setTimeout(() => {
   router.push("/")
  },1000)
   return (
    <>
    <h1 className="text-center mt-5 text-danger">404 You are Lost</h1>
    </>
   )
  }