import { useState, useEffect, createContext } from "react"
import { auth } from "../config"
import { readDoc } from "../firebase/firebase";

export const UserContext = createContext();

export const UserProvider = (props) => {
    const [user, setUser] = useState([])

    useEffect(() => {
        auth.onAuthStateChanged(user => {
          if(user){
            setUser(user)
          } else{
            setUser(null)
          }
        })
      }, [])

    return (
        <UserContext.Provider value={[user, setUser]}>
            {props.children}
        </UserContext.Provider>
    );
}