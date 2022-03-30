import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
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

import UserCards from "./components/ShowCards/UserCards";
import AddCard from "./components/Forms/AddCard";
import SpecificCard from "./components/ShowCards/SpecificCard";
import UpdateCard from "./components/Forms/UpdateCard";
import NavBar from "./components/Layout/NavBar";

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
      logOutHandler();
    });

    return () => EventBus.remove("logout");
  }, []);

  const logOutHandler = () => {
    AuthService.logout();
    setCurrentUser(undefined);
  };

  return (
    <div>
      <NavBar logOutHandler={logOutHandler} currentUser={currentUser} />
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

          <Route
            exact
            path="/usercards"
            element={<PrivateRoute currentUser={currentUser} />}
          >
            <Route exact path="/usercards" element={<UserCards />} />
          </Route>

          <Route
            exact
            path="/card/:id"
            element={<PrivateRoute currentUser={currentUser} />}
          >
            <Route exact path="/card/:id" element={<SpecificCard />} />
          </Route>

          <Route
            exact
            path="/edit/:id"
            element={<PrivateRoute currentUser={currentUser} />}
          >
            <Route exact path="/edit/:id" element={<UpdateCard />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
};

export default App;
