import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register"
import { useEffect, useState } from "react"
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom"
import "./App.css"
import { auth } from "./config"
import Loader from "./widgets/Loader/Loader";

const App = () => {  
const [user, setUser] = useState(null)
const [isLoading, setIsLoading] = useState(true)

useEffect(() => {
  auth.onAuthStateChanged(user => {
    if(user){
      setUser(user)
      setIsLoading(false)
    } else{
      setUser(null)
      setIsLoading(false)
    }
  })
}, [])

  return (
    <Router>
      <>       
        <Navbar user={user} isLoading={isLoading}/>
         <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/login">
            {user ? <Redirect to="/" /> : isLoading ? <Loader /> : <Login />}
          </Route>
          <Route exact path="/register">
          {user ? <Redirect to="/" /> : isLoading ? <Loader /> : <Register />}
          </Route>
        </Switch>
      </>
    </Router>

  );
}

export default App;
