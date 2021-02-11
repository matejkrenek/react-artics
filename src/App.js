import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register"
import { BrowserRouter as Router, Route, Switch, useLocation } from "react-router-dom"
import "./App.css"

const App = () => {  
  return (
    <Router>
      <>       
        <Navbar />
         <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
        </Switch>
      </>
    </Router>

  );
}

export default App;
