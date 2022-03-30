import React from "react";
import { Link } from "react-router-dom";

const Nav = (props) => {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div class="container-xxl">
          <Link to={"#"} className="navbar-brand">
            <i class="bi bi-lightning fs-4"> </i>
            <span className="fw-medium fs-4">Flashcards</span>
          </Link>
          <div className="navbar-nav ml-auto">
            {props.currentUser && (
              <React.Fragment>
                <li className="nav-item">
                  <Link to={"/"} className="nav-link">
                    <i class="bi bi-house-fill fs-4"></i>
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to={"/user"} className="nav-link">
                    <i class="bi bi-play-circle-fill fs-4"></i>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/usercards"} className="nav-link">
                    <i class="bi bi-pencil-fill fs-4"></i>
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to={"/addCard"} className="nav-link">
                    <i class="bi bi-plus-circle-fill fs-4"></i>
                  </Link>
                </li>

                <li className="nav-item">
                  <a
                    href="/login"
                    className="nav-link"
                    onClick={props.logOutHandler}
                  >
                    <i class="bi bi-box-arrow-right fs-4"></i>
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
