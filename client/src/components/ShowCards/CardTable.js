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

        <div className="d-grid gap-4 d-md-block">
          <button type="button" className="btn btn-dark px-3 me-3 fs-3">
            <i className="bi bi-play-circle-fill"></i>
            <span> Start session</span>
          </button>
          <button type="button" className="btn btn-dark px-3 me-3 fs-3">
            <i className="bi bi-plus-circle-fill"></i>
            <span> Add new card</span>
          </button>
        </div>
      </section>

      <section className="container py-4">
        <h3 className="text-white pb-2">Manage cards</h3>
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            id="flexSwitchCheckDefault"
          />
          <label className="form-check-label" for="flexSwitchCheckDefault">
            Show inactive cards too
          </label>
        </div>

        <div className="row gy-4">{cardList()}</div>
      </section>
    </React.Fragment>
  );
};

export default CardTable;
