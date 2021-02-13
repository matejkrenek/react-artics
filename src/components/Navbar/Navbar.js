import "./Navbar.css";
import { useContext, useState } from "react";
import reactLogo from "../../assets/react-logo.png";
import { Link, useLocation, useHistory } from "react-router-dom";
import { BiLogInCircle, BiUserCircle, BiPlus, BiUserX } from "react-icons/bi";
import { auth } from "../../config" 
import { UserContext } from "../../contexts/UserContext"

const Navbar = () => {
    const location = useLocation()
    const [isLoading, setIsLoading] = useState(false)
    const [user, setUser] = useContext(UserContext)

    const onClick = () => {
        auth.signOut()
        .then(() => {
        })
        .catch(err => console.log(err))
    }

    return ( 
        <nav className="navbar flex-box ai-center">
            <div className="flex-box ai-center flex-25"></div>
            <div className="flex-box ai-center jc-center flex-50">
                <Link to="/" className="flex-box ai-center">
                    <img src={reactLogo} alt="react logo" className="reactLogo--medium"/>
                    <h3>React Artics</h3>
                </Link>
            </div>
            <ul className="flex-box ai-center jc-end flex-25">
                {location.pathname != "/register" && location.pathname != "/login" &&
                <>
                    {user && <li><Link to="/profile"><BiUserCircle className="icon--small"/></Link></li>}
                    {user && <li><Link to="/create"><BiPlus className="icon--small"/></Link></li>}
                    {!user && !isLoading && <li><Link to="/register"><BiLogInCircle className="icon--small"/></Link></li>}
                    {user && <li onClick={onClick}><BiUserX className="icon--small"/></li>}
                </>
                }
            </ul>
        </nav>
    );
}
    
export default Navbar;
