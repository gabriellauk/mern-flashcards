import React from "react";
import { Link } from "react-router-dom";

const Nav = (props) => {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className="container-xxl">
          <Link to={"/"} className="navbar-brand">
            <i className="bi bi-lightning fs-2"> </i>
            <span className="fw-medium fs-2">Flashcards</span>
          </Link>
          <div className="navbar-nav ml-auto">
            {props.currentUser && (
              <React.Fragment>
                <li className="nav-item" title="Start session">
                  <Link to={"/card-session"} className="nav-link">
                    <i className="bi bi-play-circle-fill fs-2"></i>
                  </Link>
                </li>
                <li className="nav-item" title="Manage cards">
                  <Link to={"/manage-active-cards"} className="nav-link">
                    <i className="bi bi-pencil-square fs-2"></i>
                  </Link>
                </li>

                <li className="nav-item" title="Log out">
                  <a
                    href="/"
                    className="nav-link"
                    onClick={props.logOutHandler}
                  >
                    <i className="bi bi-box-arrow-right fs-2"></i>
                  </a>
                </li>
              </React.Fragment>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Nav;
