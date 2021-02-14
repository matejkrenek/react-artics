import { useState, useEffect, createContext } from "react"
import { db } from "../config"

export const UsersContext = createContext();

export const UsersProvider = (props) => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        db.collection("users").onSnapshot((items) => {
            try {
                let arr = []
                items.forEach(item => {
                    arr.push(item.data())
                })
    
                setUsers(arr)
            }
            catch(err){
                console.log(err)
            }
        })
    }, [])

    return (
        <UsersContext.Provider value={[users, setUsers]}>
            {props.children}
        </UsersContext.Provider>
    );
}