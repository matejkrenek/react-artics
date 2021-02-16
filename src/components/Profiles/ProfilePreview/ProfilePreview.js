import { useState, useEffect, useContext } from "react"
import { useParams } from "react-router-dom"
import { UserContext } from "../../../contexts/UserContext"
import { readDoc } from "../../../firebase/firebase"
import Loader from "../../../widgets/Loader/Loader"

const ProfilePreview = () => {
    const { uid } = useParams()
    const [thisUser, setThisUser] = useState()
    const [user, setUser] = useContext(UserContext)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if(!uid){
            setThisUser(user)
            setIsLoading(false)
        } else{
            const readUser = readDoc("users", uid)
            .then(res => {
                setThisUser(res.data())
                setIsLoading(false)
            }).catch(err => {
                console.log(err)
                setIsLoading(false)
            })
        }
    }, [])
    

    return ( 
        <h1>
            {isLoading ? <Loader /> : 
                <div className="content--container">
                    <div className="flex-box ai-center">
                        <div className="userImage">
                            <img src={thisUser.photoURL} alt=""/>
                        </div>
                        <h3>{thisUser.displayName ? thisUser.displayName : thisUser.email}</h3>
                    </div>
                    <hr />
                </div>
            }  
        </h1>
    );
}
 
export default ProfilePreview;