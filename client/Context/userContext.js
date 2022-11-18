import { createContext, useState } from "react";


const UserContext = createContext()

export function UserProvider({children}){
    const [isLoggedIn,setIsLoggedIn] = useState(false);
    const userSession = (loggedInState) => {
        setIsLoggedIn(loggedInState)
    }
    return (
        <UserContext.Provider value={{isLoggedIn,userSession}}>
            {children}
        </UserContext.Provider>
    )
}


export default UserContext;