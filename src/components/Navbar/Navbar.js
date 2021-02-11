import "./Navbar.css";
import reactLogo from "../../assets/react-logo.png";
import { BiLogInCircle, BiUserCircle, BiPlus } from "react-icons/bi"

const Navbar = () => {
    return ( 
        <nav className="navbar flex-box ai-center">
            <div className="flex-box ai-center flex-25"></div>
            <div className="flex-box ai-center jc-center flex-50">
                <div className="flex-box ai-center">
                    <img src={reactLogo} alt="react logo" className="reactLogo--medium"/>
                    <h3>React Artics</h3>
                </div>
            </div>
            <ul className="flex-box ai-center jc-end flex-25">
                <li><a href="#"><BiUserCircle className="icon--small"/></a></li>
                <li><a href="#"><BiPlus className="icon--small"/></a></li>
                <li><a href="#"><BiLogInCircle className="icon--small"/></a></li>
            </ul>
        </nav>
    );
}
    
export default Navbar;
