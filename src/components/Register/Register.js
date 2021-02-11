import { Link } from "react-router-dom"
import { FaGoogle } from "react-icons/fa"

const Register = () => {
    return ( 
        <div className="smallContent--container">
            <div className="authHeader">
                <h1>Create your own new account</h1>
                <span>Do you already have an account? <Link to="/login">Login</Link></span>
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
                <button type="submit" className="btn blue">Create an Account</button>
                <div className="divider"></div>
                <a type="submit" className="btn google flex-box ai-center"><FaGoogle/> Signup with google</a>
            </form>
        </div> 
    );
}
 
export default Register;