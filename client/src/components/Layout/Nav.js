import React from "react";
import { Link } from "react-router-dom";

const Nav = (props) => {

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
          {props.currentUser && (
            <li className="nav-item">
              <Link to={"/user"} className="nav-link">
                User
              </Link>
            </li>
          )}
          {props.currentUser && (
            <li className="nav-item">
              <Link to={"/usercards"} className="nav-link">
                User Cards
              </Link>
            </li>
          )}
          {props.currentUser && (
            <li className="nav-item">
              <Link to={"/addCard"} className="nav-link">
                Add Card
              </Link>
            </li>
          )}
        </div>
        {props.currentUser ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/profile"} className="nav-link">
                {props.currentUser.username}
              </Link>
            </li>
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={props.logOutHandler}>
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
    </div>
  );
};

export default Nav;
