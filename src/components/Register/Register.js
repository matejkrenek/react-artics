import { useState } from "react"
import { Link } from "react-router-dom"
import { FaGoogle } from "react-icons/fa"
import { emailSignup, googleLogin } from "../../firebase/firebase"
import Loader from "../../widgets/Loader/Loader"
import { useEffect } from "react/cjs/react.development"

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPasswod] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault()
        
        setIsLoading(true)

        const register = emailSignup(email, password)
        .then((creds) => {
            setIsLoading(false)
        })
        .catch(err => {
            setIsLoading(false)
            setErrorMessage(err.message)
        })
    }
    
    return ( 
        <div className="smallContent--container">
            <div className="errorMessage">{errorMessage}</div>
            <div className="authHeader">
                <h1>Create your own new account</h1>
                <span>Do you already have an account? <Link to="/login">Login</Link></span>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="inputField">
                    <label htmlFor="email">Email Address</label>
                    <input
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                </div>
                <div className="inputField">
                    <label htmlFor="password">Passowrd</label>
                    <input
                        type="password"
                        onChange={(e) => setPasswod(e.target.value)}
                        value={password}
                    />
                </div>
                <button type="submit" className="btn blue">
                    {isLoading ? <Loader /> : "Create an Account"}
                </button>
                <div className="divider"></div>
                <a type="submit" className="btn google flex-box ai-center" onClick={googleLogin}><FaGoogle/> Signup with google</a>
            </form>
        </div> 
    );
}
 
export default Register;