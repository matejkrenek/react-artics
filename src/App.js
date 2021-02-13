import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register"
import { useEffect, useState, useContext } from "react"
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom"
import "./App.css"
import Loader from "./widgets/Loader/Loader";
import CreateArticle from "./components/Articles/CreateArticle/CreateArticle";
import { ArticleProvider } from "./contexts/ArticleContext"
import { UserProvider, UserContext } from "./contexts/UserContext"
import ArticlePreview from "./components/Articles/ArticlePreview/ArticlePreview";

const App = () => {  
  return (
    <Router>
      <ArticleProvider>   
        <UserProvider>    
          <Navbar/>
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
            <Route exact path="/create">
              <CreateArticle />
            </Route>
            <Route exact path="/article/:id">
              <ArticlePreview />
            </Route>
          </Switch>
        </UserProvider>
      </ArticleProvider>
    </Router>

  );
}

export default App;
