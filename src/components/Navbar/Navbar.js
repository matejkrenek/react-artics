import "./Navbar.css";
import reactLogo from "../../assets/react-logo.png";
import { Link, useLocation } from "react-router-dom";
import { BiLogInCircle, BiUserCircle, BiPlus } from "react-icons/bi"

const Navbar = () => {
    const location = useLocation()

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
                    <li><Link to="/profile"><BiUserCircle className="icon--small"/></Link></li>
                    <li><Link to="/create"><BiPlus className="icon--small"/></Link></li>
                    <li><Link to="/register"><BiLogInCircle className="icon--small"/></Link></li>
                </>
                }
            </ul>
        </nav>
    );
}
    
export default Navbar;
