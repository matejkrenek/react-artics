import { Link } from "react-router-dom"
import { FaGoogle } from "react-icons/fa"
import stateChange from "../../firebase/firebase"

const Login = () => {
    const user = stateChange()    

    return ( 
        <div className="smallContent--container">
            <div className="authHeader">
                <h1>Login to your account</h1>
                <span>You don't have an account? <Link to="/register">Sign up</Link></span>
            </div>
            <form action="">
                <div className="inputField">
                    <label htmlFor="email">Email Address</label>
                    <input
                        type="email"
                    />
                </div>
                <div className="inputField">
                    <label htmlFor="password">Passowrd</label>
                    <input
                        type="password"
                    />
                </div>
                <button type="submit" className="btn blue">login</button>
                <div className="divider"></div>
                <a type="submit" className="btn google flex-box ai-center"><FaGoogle/> Login with google</a>
            </form>
        </div> 
    );
}
 
export default Login;