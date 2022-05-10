import React from "react";
import { Link, useNavigate } from "react-router-dom";

import CardItem from "./CardItem";

const ActiveCardsList = (props) => {

  // Maps all Cards to a Card component
  function cardList() {
    return props.activeCards.map((card) => {
      return <CardItem card={card} key={card["_id"]} />;
    });
  }

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
          <div className="col-lg-4 col-md-6">
            <div
              className="card rounded custom-card-listings-height p-4 pointer"
              onClick={goToAddCard}
            >
              <div className="card-body d-flex justify-content-center pb-1 px-0 pt-0 fs-1">
                <div className="align-self-center">
                  <i
                    className="bi bi-plus-circle-fill align-middle"
                    title="Add new card"
                  ></i>
                  <span className="align-middle"> NEW CARD</span>
                </div>
              </div>
            </div>
          </div>

          {cardList()}
        </div>
      </section>
    </React.Fragment>
  );
};

export default ActiveCardsList;
