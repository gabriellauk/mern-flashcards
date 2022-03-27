import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import BoardUser from "./components/BoardUser";

import EventBus from "./components/common/EventBus";
import PrivateRoute from "./components/common/PrivateRoute";

// import CreateCard from "./components/CreateCard";
// import AllCards from "./components/AllCards";
// import EditCard from "./components/EditCard";
// import ViewCard from "./components/ViewCard.js";
import UserCards from "./components/ShowCards/UserCards";
import AddCard from "./components/AddCard/AddCard";

const App = () => {
  const [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser());

  const updateUserState = () => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  };
  useEffect(updateUserState, []);

  useEffect(() => {
    EventBus.on("logout", () => {
      logOut();
    });

    return () => EventBus.remove("logout");
  }, []);

  const logOut = () => {
    AuthService.logout();
    setCurrentUser(undefined);
  };

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to={"/"} className="navbar-brand">
          Flashcards
        </Link>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/"} className="nav-link">
              Home
            </Link>
          </li>
          {currentUser && (
            <li className="nav-item">
              <Link to={"/user"} className="nav-link">
                User
              </Link>
            </li>
          )}
          {currentUser && (
            <li className="nav-item">
              <Link to={"/usercards"} className="nav-link">
                User Cards
              </Link>
            </li>
          )}
          {currentUser && (
            <li className="nav-item">
              <Link to={"/addCard"} className="nav-link">
                Add Card
              </Link>
            </li>
          )}
        </div>
        {currentUser ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/profile"} className="nav-link">
                {currentUser.username}
              </Link>
            </li>
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logOut}>
                Log out
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Log in
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                Sign up
              </Link>
            </li>
          </div>
        )}
      </nav>
      <div className="container mt-3">
        <Routes>
          <Route exact path={"/"} element={<Home />} />
          <Route
            exact
            path="/login"
            element={<Login onLoggedIn={updateUserState} />}
          />
          <Route exact path="/register" element={<Register />} />

          <Route
            exact
            path="/profile"
            element={<PrivateRoute currentUser={currentUser} />}
          >
            <Route exact path="/profile" element={<Profile />} />
          </Route>

          <Route
            exact
            path="/addcard"
            element={<PrivateRoute currentUser={currentUser} />}
          >
            <Route exact path="/addcard" element={<AddCard />} />
          </Route>

          <Route path="/user" element={<BoardUser />} />
          <Route path="/usercards" element={<UserCards />} />
        </Routes>
      </div>
    </div>
  );

  // return (
  //   <div>
  //     <Routes>
  //       <Route path="/add" element={<CreateCard />} />
  //       <Route path="/" element={<AllCards />} />
  //       <Route path="/edit/:id" element={<EditCard />} />
  //       <Route path="/card/:id" element={<ViewCard />} />
  //     </Routes>
  //   </div>
  // );
};

export default App;
