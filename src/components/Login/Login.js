import { useState } from "react";
import { Link } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import Loader from "../../widgets/Loader/Loader"
import { emailLogin, googleLogin } from "../../firebase/firebase";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPasswod] = useState("");
    const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()

        setIsLoading(true)

        const login = emailLogin(email, password)
        .then(creds => {
            setIsLoading(false)
        }).catch(err => {
            setIsLoading(false)
            setErrorMessage(err.message)
        })
    }

    return ( 
        <div className="smallContent--container">
            <div className="errorMessage">{errorMessage}</div>
            <div className="authHeader">
                <h1>Login to your account</h1>
                <span>You don't have an account? <Link to="/register">Sign up</Link></span>
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
                    {isLoading ? <Loader /> : "Login"}
                </button>
                <div className="divider"></div>
                <a type="submit" className="btn google flex-box ai-center" onClick={googleLogin}><FaGoogle/> Login with google</a>
            </form>
        </div> 
    );
}
 
export default Login;