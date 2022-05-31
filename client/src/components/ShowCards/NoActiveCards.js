import React from "react";
import { Link } from "react-router-dom";

import NoCards from "../common/NoCards";

const NoActiveCards = () => {
   return (
    <React.Fragment> 
      <section className="row py-4">
        <div className="col-12">
          <h3 className="text-white pb-2">Manage cards</h3>
        </div>

        <div className="row m-1">
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <span
                className="nav-link active text-white fs-5"
                aria-current="page"
                href="#"
              >
                Active
              </span>
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
