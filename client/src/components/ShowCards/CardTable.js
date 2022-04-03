import React from "react";
import { Link } from "react-router-dom";

import CardRow from "./CardRow";
import { useState } from "react";

import UserService from "../../services/user.service";
import EventBus from "../common/EventBus";

const CardTable = (props) => {
  const [cards, setCards] = useState(props.cards);

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
    return props.cards.map((card) => {
      return (
        <CardRow
          card={card}
          deleteCard={() => deleteCard(card["_id"])}
          key={card["_id"]}
        />
      );
    });
  }

  return (
    <React.Fragment>
      <section className="container py-5">
        <h2 className="display-5 text-white py-2">
          Welcome to Flashcards, an online learning tool to help you memorise
          new concepts.
        </h2>

        <div className="row gy-2">
          <div className="col-md-auto">
            <button type="button" className="btn btn-dark px-3 fs-3 button-100">
              <i className="bi bi-play-circle-fill"></i>
              <span> Start session</span>
            </button>
          </div>
          <div className="col-md-auto">
            <button type="button" className="btn btn-dark px-3 fs-3 button-100">
              <i className="bi bi-plus-circle-fill"></i>
              <span> Manage cards</span>
            </button>
          </div>
        </div>
      </section>

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
              <a className="nav-link text-white fs-5" href="#">
                Inactive
              </a>
            </li>
          </ul>
        </div>
        <div className="row gy-4 m-1">
          <div className="col-lg-4 col-md-6">
            <div className="card rounded custom-card-listings-height p-4">
              <div className="card-body d-flex justify-content-center pb-1 px-0 pt-0 fs-1">
                <div className="align-self-center">
                <i className="bi bi-plus-circle-fill align-middle"></i>
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

export default CardTable;
