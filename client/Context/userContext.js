import { createContext, useEffect, useState } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState();
  const [userName,setUserName] = useState();
  const [userid,setUserid] = useState();
  useEffect(() => {
    const spinSession = localStorage.getItem("UserPublicId")
    const fetchUserName = localStorage.getItem("UserPublicName")
    if (spinSession) {
      setUserName(fetchUserName)
      setUserid(spinSession)
      setIsLoggedIn(true);
    } else {
      setUserName(null)
      setIsLoggedIn(false);
    }
  }, []);
  console.log(userName)

  const userSession = (loggedInState) => {
    setIsLoggedIn(loggedInState);
  };
  return (
    <UserContext.Provider value={{ isLoggedIn, userSession,userName,userid }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;
