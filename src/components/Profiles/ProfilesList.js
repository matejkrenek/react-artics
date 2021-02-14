import Loader from "../../widgets/Loader/Loader"
import ProfileItem from "./Profile/ProfileItem"
import { useState, useContext, useEffect } from "react";
import { UsersContext } from "../../contexts/UsersContext"

const Profiles = () => {
    const [users, setUsers] = useContext(UsersContext)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if(users.length > 0){
            setIsLoading(false)
        }
    }, [users])
    
    
    return ( 
        <div className="profiles">
            <h1>Profiles</h1>
            {isLoading && <Loader />}
            {isLoading == false &&
                users.map((user) => (
                    <ProfileItem key={user.email} email={user.email} articlesNum={user.articles != null ? user.articles.length : 0} name={user.displayName}/>
                ))
            }
        </div>
    );
}
 
export default Profiles;