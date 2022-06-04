import React from "react";

import { useState, useEffect } from "react";

import { Link } from "react-router-dom";

import CardService from "../../services/card.service";

import CardItem from "./CardItem";

const InactiveCardsList = () => {
  const [errorContent, setErrorContent] = useState("");
  const [inactiveCards, setInactiveCards] = useState([]);

  const loadInactiveCards = async () => {
    try {
      const cards = await CardService.getInactiveCards();
      setInactiveCards(cards);
    } catch (error) {
      const errorMessage = error.message || error.toString();
      setErrorContent(errorMessage);
    }
  };

  useEffect(() => {
    loadInactiveCards();
  }, []);

  // Maps all Cards to a Card component
  function cardList() {
    return inactiveCards.map((card) => {
      return <CardItem card={card} key={card["_id"]} />;
    });
  }

  return (
    <React.Fragment>
      <section className="row py-4">
        <div className="col-12">
          <h3 className="text-white pb-2">Manage cards</h3>
        </div>

        <div className="row m-1">
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <Link
                to={"/manage-active-cards"}
                className="nav-link text-white fs-5"
                aria-current="page"
              >
                Active
              </Link>
            </li>
            <li className="nav-item">
              <span className="nav-link active text-white fs-5" href="#">
                Inactive
              </span>
            </li>
          </ul>
        </div>
        <div className="row gy-4 m-1">{cardList()}</div>
      </section>
    </React.Fragment>
  );
};

export default InactiveCardsList;
