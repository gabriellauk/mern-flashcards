import React from "react";

import { useState, useEffect } from "react";

import { Link } from "react-router-dom";

import UserService from "../../services/user.service";
import EventBus from "../common/EventBus";

import CardItem from "./CardItem";

const InactiveCardsList = (props) => {
  const [errorContent, setErrorContent] = useState("");
  const [inactiveCards, setInactiveCards] = useState([]);

  const getInactiveCards = () => {
    UserService.getInactiveCards().then(
      (response) => {
        setInactiveCards(response.data);
      },

      (error) => {
        const _errorMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setErrorContent(_errorMessage);
        console.log(_errorMessage);
        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );
  };

  useEffect(getInactiveCards, []);

  async function deleteCard(id) {
    UserService.deleteCard(id).then(
      (response) => {
        props.onDelete();
      },
      (error) => {
        const _errorMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        // setErrorContent(_errorMessage);
        console.log(_errorMessage);
        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );
  }

  // Maps all Cards to a Card component
  function cardList() {
    return inactiveCards.map((card) => {
      return (
        <CardItem
          card={card}
          deleteCard={() => deleteCard(card["_id"])}
          key={card["_id"]}
        />
      );
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
              <a className="nav-link active text-white fs-5" href="#">
                Inactive
              </a>
            </li>
          </ul>
        </div>
        <div className="row gy-4 m-1">{cardList()}</div>
      </section>
    </React.Fragment>
  );
};

export default InactiveCardsList;
