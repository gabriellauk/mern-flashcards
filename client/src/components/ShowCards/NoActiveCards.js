import React from "react";
import { Link, useNavigate } from "react-router-dom";

import NoCards from "../common/NoCards";

const NoActiveCards = (props) => {
  const navigate = useNavigate();

  const goToAddCard = () => {
    navigate("../../add-card");
  };

  return (
    <React.Fragment>
      <section className="row py-4">
        <div className="col-12">
          <h3 className="text-white pb-2">Manage cards</h3>
        </div>

        <div className="row m-1">
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <a
                className="nav-link active text-white fs-5"
                aria-current="page"
                href="#"
              >
                Active
              </a>
            </li>
            <li className="nav-item">
              <Link
                to={"/manage-inactive-cards"}
                className="nav-link text-white fs-5"
              >
                Inactive
              </Link>
            </li>
          </ul>
        </div>
        <div className="row gy-4 m-1">
          <NoCards />
        </div>
      </section>
    </React.Fragment>
  );
};

export default NoActiveCards;
