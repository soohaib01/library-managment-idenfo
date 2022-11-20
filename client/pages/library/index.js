import React, { useEffect } from "react";
import Dashboard from "../../components/dashboard";
import UserContext from "../../Context/userContext";
import { useContext, useState } from "react";
import { useRouter } from "next/router";
const Library = ({ data }) => {
  const router = useRouter();
  const { isLoggedIn } = useContext(UserContext);
  useEffect(() => {
    if (isLoggedIn === false) {
      router.push("/");
    }
  }, []);
  if (isLoggedIn === false) {
    if (typeof window !== "undefined") {
      location.href = "/";
    }
  }
  return (
    <div>
      {isLoggedIn && <Dashboard books={data} />}
      {!isLoggedIn && (
        <h1 className="text-center mt-2 text-warning ">
          Redirecting.. Please Login
        </h1>
      )}
    </div>
  );
};

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/books`);
  const data = await res.json();
  console.log(data);
  // Pass data to the page via props
  return { props: { data } };
}
export default Library;
