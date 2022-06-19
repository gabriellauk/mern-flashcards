import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./sass/main.scss";
import "./App.css";

import AuthService from "./services/auth.service";
import Login from "./components/Login";
import Register from "./components/Register";

import EventBus from "./components/common/EventBus";
import PrivateRoute from "./components/common/PrivateRoute";

import UserCards from "./components/ShowCards/UserCards";
import InactiveCardsList from "./components/ShowCards/InactiveCardsList";
import AddCard from "./components/Forms/AddCard";
import UpdateCard from "./components/Forms/UpdateCard";
import NavBar from "./components/Layout/NavBar";
import Welcome from "./components/Welcome";
import CardSession from "./components/CardSession/CardSession";

const App = () => {
  const [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser());

  const updateUserState = () => {
    // Check if there is a user currently logged in
    const user = AuthService.getCurrentUser();
    // If there is, store this in state
    if (user) {
      setCurrentUser(user);
    }
  };
  useEffect(updateUserState, []);

  const logOutHandler = () => {
    AuthService.logout();
    setCurrentUser(undefined);
  };

  const runLogOut = () => {
    logOutHandler();
  };

  useEffect(() => {
    EventBus.on("logout", runLogOut);
    return () => EventBus.remove("logout", runLogOut);
  }, []);

  return (
    <div className="d-flex flex-column vh-100">
      <NavBar logOutHandler={logOutHandler} currentUser={currentUser} />
      <div className="container-md container-fluid flex-fill py-5">
        <Routes>
          {/* If the user is logged in, show the welcome component.
          Otherwide, show the login component. */}
          <Route
            exact
            path={"/"}
            element={
              currentUser !== null ? (
                <Navigate replace to="/welcome" />
              ) : (
                <Login onLoggedIn={updateUserState} />
              )
            }
          />

          <Route exact path="/register" element={<Register />} />

          <Route
            exact
            path="/welcome"
            element={<PrivateRoute currentUser={currentUser} />}
          >
            <Route exact path="/welcome" element={<Welcome />} />
          </Route>

          <Route
            exact
            path="/add-card"
            element={<PrivateRoute currentUser={currentUser} />}
          >
            <Route exact path="/add-card" element={<AddCard />} />
          </Route>

          <Route
            exact
            path="/manage-active-cards"
            element={<PrivateRoute currentUser={currentUser} />}
          >
            <Route exact path="/manage-active-cards" element={<UserCards />} />
          </Route>

          <Route
            exact
            path="/manage-inactive-cards"
            element={<PrivateRoute currentUser={currentUser} />}
          >
            <Route
              exact
              path="/manage-inactive-cards"
              element={<InactiveCardsList />}
            />
          </Route>

          <Route
            exact
            path="/edit/:id"
            element={<PrivateRoute currentUser={currentUser} />}
          >
            <Route exact path="/edit/:id" element={<UpdateCard />} />
          </Route>

          <Route
            exact
            path="/card-session"
            element={<PrivateRoute currentUser={currentUser} />}
          >
            <Route exact path="/card-session" element={<CardSession />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
};

export default App;
