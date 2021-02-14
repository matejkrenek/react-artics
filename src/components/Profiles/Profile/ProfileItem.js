import { Link } from "react-router-dom"

const ProfileItem = ({email, name, articlesNum}) => {
    return ( 
        <Link to="/profile">
            <div className="singleProfileItem flex-box">
                <div className="singleProfileItem__profileImage">
                    <img src="" alt=""/>
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