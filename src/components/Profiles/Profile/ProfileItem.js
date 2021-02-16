import { useContext } from "react"
import { Link } from "react-router-dom"
import { UserContext } from "../../../contexts/UserContext";

const ProfileItem = ({email, name, articlesNum, uid, photoURL}) => {
    const [user, setUser] = useContext(UserContext)

    return ( 
        <Link to={`/profile/${user && user.uid == uid ? "" : uid}`}>
            <div className="singleProfileItem flex-box">
                <div className="singleProfileItem__profileImage">
                    <img src={photoURL} alt=""/>
                </div>
                <div className="singleProfileItem__content flex-box ai-center jc-space">
                    <div>
                        <h3>{name ? name : "unnamed"}</h3>
                        <span>{email}</span>
                    </div>

                    <div>Articles: {articlesNum}</div>
                </div>
            </div>
        </Link>
     );
}
 
export default ProfileItem;