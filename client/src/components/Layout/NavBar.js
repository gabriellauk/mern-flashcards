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
                <ul className="navbar-nav me-auto mb-lg-0">
                <li className="nav-item">
                  <Link to={"/card-session"} className="nav-link" title="Start session">
                    <i className="bi bi-play-circle-fill fs-2"></i>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/manage-active-cards"} className="nav-link" title="Start session">
                    <i className="bi bi-pencil-square fs-2"></i>
                  </Link>
                </li>

                <li className="nav-item">
                  <a
                    href="/"
                    className="nav-link"
                    onClick={props.logOutHandler}
                    title="Start session"
                  >
                    <i className="bi bi-box-arrow-right fs-2"></i>
                  </a>
                </li>
                </ul>
              </React.Fragment>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Nav;
